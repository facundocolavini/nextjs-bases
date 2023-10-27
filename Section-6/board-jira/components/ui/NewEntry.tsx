
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState,useContext } from "react";
import { UIContext } from "../../context/ui";
import { EntriesContext } from "../../context/entries";
export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onReset = ()=>{
    setIsAddingEntry(false)
    setTouched(false);
    setInputValue("");
  }
  const onSave = () => {
    if (inputValue.length  === 0) return;
    addNewEntry(inputValue);
    onReset();
    console.log(inputValue,'onSave');
  }

  return (
    <Box sx={{ marginBotom: 2, padding: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={()=> setTouched(true)}
          />
          <Box display="flex" justifyContent={"space-between"}>
            <Button variant="text" onClick={onReset}>
              Cancelar
            </Button>
            <Button variant="outlined" color="secondary" endIcon={<SaveIcon />} onClick={onSave}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            fullWidth
            variant="outlined"
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar Tarea
          </Button>
        </>
      )}
    </Box>
  );
};
