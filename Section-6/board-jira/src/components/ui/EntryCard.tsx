import { UIContext } from "@/context/ui";
import { Entry } from "@/interfaces";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC ,DragEvent,useContext} from "react";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
const {startDragging, endDragging} = useContext(UIContext)
  const onDragStart = (event: DragEvent) => {
    /* Modificar el estado  */
    startDragging();
    event.dataTransfer.setData("text", entry._id);
  }

  const onDragEnd = (event: DragEvent) => {
    /* Termina el drag  */
    endDragging();
  }
  return (
    <Card sx={{ marginBottom: 1 }}
      draggable
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
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
