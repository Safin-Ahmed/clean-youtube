import { Button } from "@mui/material";
import styles from "./CreateNoteButton.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";
import NoteEditor from "./NoteEditor";

const CreateNoteButton = ({ elapsed }) => {
  const [btnClicked, setBtnClicked] = useState(false);
  const onSave = (data) => {
    console.log(data);
    setBtnClicked(false);
  };

  const onCancel = (data) => {
    setBtnClicked(false);
  };
  return (
    <div className={styles.wrapper}>
      {!btnClicked && (
        <Button
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            borderColor: "red",
            color: "#fff",
            "&:hover": {
              borderColor: "red",
            },
          }}
          onClick={() => setBtnClicked(true)}
          variant="outlined"
        >
          <span className={styles.btnLeft}>Create a new note at {elapsed}</span>
          <AddCircleIcon />
        </Button>
      )}
      {btnClicked && (
        <>
          <NoteEditor timeStamp={elapsed} onSave={onSave} onCancel={onCancel} />
        </>
      )}
    </div>
  );
};

export default CreateNoteButton;
