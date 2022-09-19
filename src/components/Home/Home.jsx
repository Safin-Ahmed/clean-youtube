import { Container, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import PlayListCardList from "../CardList/PlayListCardList";
import InputField from "../UI/InputField";

const Home = () => {
  const playlist = useStoreActions((actions) => actions.playlist);
  const playlistState = useStoreState((state) => state.playlist);
  const allPlaylists = Object.keys(playlistState.data);
  return (
    <Container>
      <Typography
        align="center"
        sx={{ color: "#fff", letterSpacing: "1rem", mt: 3, mb: 3 }}
        variant="h4"
      >
        CLEAN YOUTUBE
      </Typography>
      <Typography
        align="center"
        sx={{ color: "#fff", mt: 3, mb: 4 }}
        variant="body2"
      >
        Paste your desired playlist id and hit add button.
      </Typography>
      <InputField getPlaylist={playlist.getPlaylist} />
      <PlayListCardList title="All Playlists" items={allPlaylists} />;
    </Container>
  );
};

export default Home;
