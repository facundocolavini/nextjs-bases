
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC ,DragEvent,useContext} from "react";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
const {startDragging, endDragging} = useContext(UIContext)
const router = useRouter();
  const onDragStart = (event: DragEvent) => {
    /* Modificar el estado  */
    startDragging();
    event.dataTransfer.setData("text", entry._id);
  }

  const onDragEnd = (event: DragEvent) => {
    /* Termina el drag  */
    endDragging();
  }
  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }
  return (
    <Card sx={{ marginBottom: 1 }}
      draggable
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {/* Evento drag */}

      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <Typography variant="body2">{dateFunctions.formatDistance(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
