import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import styles from "./InputField.module.css";
import { Button, Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";

export default function InputField({ getPlaylist, items }) {
  const [playlistId, setPlaylistId] = React.useState("");
  const [localError, setLocalError] = React.useState("");
  const { error } = useStoreState((state) => state.playlist);
  const handleChange = (e) => {
    setLocalError("");
    setPlaylistId(e.target.value);
  };
  const handleSubmit = () => {
    if (!playlistId) {
      return setLocalError(
        "Invalid Playlist ID, Please Provide a Valid Playlist ID"
      );
    }
    if (items.length === 10) {
      return setLocalError(
        "Playlist limit exceeded. You cannot add more than 10 playlist at a time"
      );
    }
    let finalId = playlistId;
    if (playlistId.includes("youtube.com")) {
      if (!playlistId.includes("playlist?")) {
        finalId = playlistId.split("&")[1].split("=")[1];
      } else {
        finalId = playlistId.split("?")[1].split("=")[1];
      }
    } else {
      setLocalError("Invalid Link / Playlist Id");
      return;
    }
    console.log(finalId);
    getPlaylist(finalId);
    setPlaylistId("");
    setLocalError("");
  };
  return (
    <>
      <Paper
        className={styles.paper}
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: "#fff",
          }}
          placeholder="Get Your Desired Playlist"
          inputProps={{ "aria-label": "get playlist" }}
          onChange={handleChange}
          value={playlistId}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "red" } }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Paper>
      {localError && (
        <Typography
          sx={{ width: "60%", margin: "1rem auto !important" }}
          variant="body2"
          color="error"
        >
          {localError}
        </Typography>
      )}
      {error && (
        <Typography
          sx={{ width: "60%", margin: "1rem auto !important" }}
          variant="body2"
          color="error"
        >
          {error}
        </Typography>
      )}
    </>
  );
}
