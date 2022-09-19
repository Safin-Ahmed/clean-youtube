import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import styles from "./InputField.module.css";
import { Button } from "@mui/material";

export default function InputField() {
  const [playlistId, setPlaylistId] = React.useState("");
  const handleChange = (e) => {
    setPlaylistId(e.target.value);
  };
  const handleSubmit = () => {
    console.log(playlistId);
  };
  return (
    <Paper
      className={styles.paper}
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#fff" }}
        placeholder="Get Your Desired Playlist"
        inputProps={{ "aria-label": "get playlist" }}
        onChange={handleChange}
        value={playlistId}
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: "red" }}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </Paper>
  );
}
