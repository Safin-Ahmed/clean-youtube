import { Button } from "@mui/material";
import styles from "./CreateNoteButton.module.css";
import React from "react";

const CreateNoteButton = () => {
  return (
    <div className={styles.wrapper}>
      <Button sx={{ width: "100%" }} variant="outlined">
        Outlined
      </Button>
    </div>
  );
};

export default CreateNoteButton;
