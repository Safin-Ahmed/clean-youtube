import { Container, Typography } from "@mui/material";
import { useStoreActions } from "easy-peasy";
import React from "react";
import InputField from "../UI/InputField";

const Home = () => {
  const playlist = useStoreActions((actions) => actions.playlist);
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
    </Container>
  );
};

export default Home;
