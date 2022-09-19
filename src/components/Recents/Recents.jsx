import { Container } from "@mui/material";
import { useStoreState } from "easy-peasy";
import React from "react";
import PlayListCardList from "../CardList/PlayListCardList";

const Recents = () => {
  const recentsState = useStoreState((state) => state.recents);
  const recentPlaylists = recentsState.items;
  return (
    <Container>
      {recentPlaylists.length > 0 && (
        <PlayListCardList title="Recents" items={recentPlaylists} />
      )}
    </Container>
  );
};

export default Recents;
