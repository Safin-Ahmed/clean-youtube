import { Container, Grid, Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";
import React from "react";
import PlayListCard from "../Card/PlayListCard";
import styles from "./CardList.module.css";
const PlayListCardList = ({ title, items }) => {
  const playlistState = useStoreState((state) => state.playlist);
  return (
    <Container className={styles.wrapper}>
      <Typography variant="h5" sx={{ color: "#fff" }}>
        {title} {`(${items.length})`}
      </Typography>
      <Grid container spacing={4}>
        {items.map((item) => {
          const playlist = playlistState.data[item];
          return (
            <Grid
              className={styles.cardsWrapper}
              key={playlist.playlistId}
              item
              xs={12}
              md={4}
            >
              <PlayListCard playlist={playlist} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default PlayListCardList;
