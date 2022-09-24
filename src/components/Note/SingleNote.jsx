import { Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./SingleNote.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModeEdit } from "@mui/icons-material";
import { useStoreActions } from "easy-peasy";
import NoteEditor from "./NoteEditor";
import { convertStringTimeToSecs } from "../../utils/time";

const SingleNote = ({
  note,
  videoTitle,
  videoId,
  onDurationChange,
  playlistId,
}) => {
  const noteActions = useStoreActions((action) => action.notes);
  const [isEdit, setIsEdit] = useState();
  const handleTime = () => {
    const secs = convertStringTimeToSecs(note.time);
    console.log(secs);
    onDurationChange(secs);
  };
  const onSave = (data) => {
    console.log(data);
    noteActions.addNote({
      playlistId,
      videoId,
      time: note.time,
      note: data,
    });
    setIsEdit(false);
  };

  const onCancel = (data) => {
    setIsEdit(false);
  };
  const onEdit = () => {
    setIsEdit(true);
  };
  const onDelete = () => {
    noteActions.removeNote({
      playlistId,
      videoId,
      time: note.time,
    });
  };
  return (
    <section className={styles.noteSection}>
      <div className={styles.noteWrapper}>
        <div className={styles.noteLeft}>
          <Chip
            onClick={handleTime}
            sx={{ cursor: "pointer" }}
            color="error"
            label={note.time}
          />
          <Typography variant="h6">{videoTitle}</Typography>
        </div>
        <div className={styles.noteRight}>
          <ModeEdit sx={{ cursor: "pointer" }} onClick={onEdit} />
          <DeleteIcon sx={{ cursor: "pointer" }} onClick={onDelete} />
        </div>
      </div>
      {!isEdit ? (
        <div className={styles.note}>{note.note}</div>
      ) : (
        <div className={styles.edit}>
          <NoteEditor onSave={onSave} onCancel={onCancel} mode="edit" />
        </div>
      )}
    </section>
  );
};

export default SingleNote;
