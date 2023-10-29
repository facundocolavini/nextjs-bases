import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { Layout } from "../../components/layouts";
import { EntriesContext } from "../../context/entries";
import { dbEntries } from "../../database";
import { Entry, EntryStatus } from "../../interfaces";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
}

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry?.description || "");
  const [entryStatus, setEntryStatus] = useState<EntryStatus>(entry?.status);
  const [touched, setTouched] = useState(false);

  const isValid = useMemo(
    () => touched && inputValue.length <= 0,
    [inputValue, touched]
  );

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setEntryStatus(event.target.value as EntryStatus);
  };

  const onDeleteEntry = () => {
    deleteEntry(entry._id);
    router.push("/");
  };
  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status: entryStatus,
    };
    updateEntry(updatedEntry, true);
    router.push("/");
  };

  return (
    <Layout title={inputValue?.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.formatDistance(
                entry?.createdAt
              )} minutos`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChange}
                helperText={isValid && "Ingrese un valor"}
                error={isValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={entryStatus} onChange={onStatusChanged}>
                  {validStatus.map((option: EntryStatus) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                fullWidth
                startIcon={<SaveOutlinedIcon />}
                onClick={onSave}
                disabled={inputValue?.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={onDeleteEntry}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  // Cuando el usuario solicita la peticion al servidor es server side props corre en el servidor
  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    /* Redirect to home */
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};
export default EntryPage;
