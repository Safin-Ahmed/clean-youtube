import { Button } from "@mui/material";
import styles from "./CreateNoteButton.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";
import NoteEditor from "./NoteEditor";

const CreateNoteButton = ({ elapsed }) => {
  const [btnClicked, setBtnClicked] = useState(false);
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
      {btnClicked && <NoteEditor />}
    </div>
  );
};

export default CreateNoteButton;
