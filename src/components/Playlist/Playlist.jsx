import { Container, Typography } from "@mui/material";
import { useStoreActions } from "easy-peasy";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Playlist = () => {
  const { playlistId } = useParams();
  const recentActions = useStoreActions((actions) => actions.recents);
  useEffect(() => {
    recentActions.addToRecent(playlistId);
  }, []);
  return (
    <Container>
      <Typography variant="h6">
        Dynamic Page for Playlist #{playlistId}
      </Typography>
    </Container>
  );
};

export default Playlist;
