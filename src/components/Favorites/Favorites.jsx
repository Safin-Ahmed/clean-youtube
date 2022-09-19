import { Container } from "@mui/material";
import { useStoreState } from "easy-peasy";
import React from "react";
import PlayListCardList from "../CardList/PlayListCardList";

const Favorites = () => {
  const favoritesState = useStoreState((state) => state.favorites);
  const favoritePlaylists = favoritesState.items;
  return (
    <Container>
      {favoritePlaylists.length > 0 && (
        <PlayListCardList title="Favorites" items={favoritePlaylists} />
      )}
    </Container>
  );
};

export default Favorites;
