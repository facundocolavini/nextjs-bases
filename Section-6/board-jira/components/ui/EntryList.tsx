import { List, Paper } from "@mui/material";
import { DragEvent, FC, useContext, useMemo } from "react";
import { EntryCard } from ".";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { Entry, EntryStatus } from "../../interfaces";
import styles from "./EntryList.module.css";
interface Props {
  status: EntryStatus;
}

const EntryList: FC<Props> = ({ status }: Props) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => {
    return entries.filter((entry: Entry) => entry.status === status);
  }, [entries, status]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 230px)",
          padding: "1px 8px",
          overflowY: "scroll",
          backgroundColor: "transparent",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.5 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default EntryList;
