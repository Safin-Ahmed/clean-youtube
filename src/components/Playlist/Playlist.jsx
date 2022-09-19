import { Container, Typography } from "@mui/material";
import { useStoreActions } from "easy-peasy";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PersistentDrawerRight from "../Layout/Drawer";

const Playlist = () => {
  const { playlistId } = useParams();
  const recentActions = useStoreActions((actions) => actions.recents);
  useEffect(() => {
    recentActions.addToRecent(playlistId);
  }, []);
  return <PersistentDrawerRight />;
};

export default Playlist;
