import { Container, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaylistContentDrawer from "../Layout/Drawer";

const Playlist = () => {
  const { playlistId } = useParams();
  const playlistData = useStoreState((state) => state.playlist).data[
    playlistId
  ];
  console.log(playlistData);
  const recentActions = useStoreActions((actions) => actions.recents);
  useEffect(() => {
    recentActions.addToRecent(playlistId);
  }, []);
  return <PlaylistContentDrawer playlist={playlistData} />;
};

export default Playlist;
