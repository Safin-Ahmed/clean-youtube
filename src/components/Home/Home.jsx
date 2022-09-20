import { Container, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import PlayListCardList from "../CardList/PlayListCardList";
import Favorites from "../Favorites/Favorites";
import Recents from "../Recents/Recents";
import InputField from "../UI/InputField";

const Home = () => {
  const playlist = useStoreActions((actions) => actions.playlist);
  const playlistState = useStoreState((state) => state.playlist);
  const favoriteState = useStoreState((state) => state.favorites).items;
  const recentState = useStoreState((state) => state.recents).items;
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
      <InputField items={allPlaylists} getPlaylist={playlist.getPlaylist} />
      {allPlaylists.length > 0 && (
        <PlayListCardList title="All Playlists" items={allPlaylists} />
      )}

      <Favorites />
      <Recents />
    </Container>
  );
};

export default Home;
