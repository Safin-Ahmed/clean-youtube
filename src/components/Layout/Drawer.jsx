import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import { Container, ListItemAvatar } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";
import styles from "./Drawer.module.css";
import { CleaningServicesOutlined } from "@mui/icons-material";

import CustomTabs from "../UI/CustomTabs";
import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import useElapse from "../../hooks/useElapse";
import { useEffect } from "react";
import { convertStringTimeToSecs } from "../../utils/time";

const drawerWidth = 650;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PlaylistContentDrawer({ playlist }) {
  console.log("Rendering Drawer Component");
  const [searchParams, setSearchParams] = useSearchParams();
  const [event, setEvent] = React.useState();

  const videoId = searchParams.get("video");
  const [selectedVideo, setSelectedVideo] = React.useState("");
  const playerRef = React.useRef();
  const videoState = useStoreState((state) => state.videoId);
  const videoData = videoState.data[playlist.playlistId];
  const elapseState = useStoreState((state) => state.elapsed);
  const playlistElapseState = elapseState.data[playlist.playlistId];
  const elapseActions = useStoreActions((actions) => actions.elapsed);
  const [startTime, setStartTime] = useState(0);

  const videoActions = useStoreActions((action) => action.videoId);
  const { elapsed } = useElapse(event);

  useEffect(() => {
    // Get video start time if exists!
    if (!playlistElapseState) {
      return;
    }
    if (playlistElapseState[videoId]) {
      setStartTime(convertStringTimeToSecs(playlistElapseState[videoId]));
    } else {
      setStartTime(0);
    }
  }, [videoId]);

  useEffect(() => {
    // set Elapse time for a video
    elapseActions.addElapse({
      playlistId: playlist.playlistId,
      videoId,
      elapsed,
    });
  }, [elapsed]);

  React.useEffect(() => {
    console.log("Setting Search Params with video id");
    let videoId;
    if (videoData) {
      videoId = videoData.videoId;
    } else {
      videoId = playlist.playlistItems[0].contentDetails.videoId;
    }
    setSearchParams({
      video: videoId,
    });
  }, []);

  useEffect(() => {
    videoActions.addVideoId({
      playlistId: playlist.playlistId,
      videoId,
    });
  }, [videoId]);

  React.useEffect(() => {
    setSelectedVideo(videoId);
  }, [videoId]);

  const videoInfo = playlist.playlistItems.find(
    (item) => item.contentDetails.videoId === videoId
  );

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const onDurationChange = (secs) => {
    if (!event) {
      return;
    }
    event?.target?.seekTo(secs, true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOnVideoClick = (videoId) => {
    setSearchParams({
      video: videoId,
    });
  };

  const opts = {
    height: "590",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0,
      start: startTime,
    },
  };

  const onChange = (e) => {
    if (
      e.data === YouTube.PlayerState.PLAYING ||
      e.data === YouTube.PlayerState.UNSTARTED
    ) {
      setEvent(e);
    }

    if (
      e.data === YouTube.PlayerState.PAUSED ||
      e.data === YouTube.PlayerState.ENDED
    ) {
      setEvent(e);
    }

    return;
  };

  const onEnd = (e) => {
    elapseActions.removeVideoElapse({
      playlistId: playlist.playlistId,
      videoId: selectedVideo,
    });
    const currentVideoIndex = playlist.playlistItems.findIndex(
      (item) => item.contentDetails.videoId === selectedVideo
    );

    const nextVideoId =
      playlist.playlistItems[currentVideoIndex + 1].contentDetails.videoId;

    setSearchParams({
      video: nextVideoId,
    });
  };

  //
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          background: "#FF0000",
          display: { xs: open ? "none" : "block", md: "block" },
        }}
        position="fixed"
        open={open}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <CleaningServicesOutlined
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                ml: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                borderRight: "1px solid #fff",
                pr: 2,
              }}
            >
              CLEAN YOUTUBE
            </Typography>

            <CleaningServicesOutlined
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CLEAN YOUTUBE
            </Typography>
            <div>
              <Typography
                sx={{ display: { xs: "none", md: "block" } }}
                variant="h6"
              >
                {playlist.playlistTitle}
              </Typography>
            </div>
          </div>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main
        sx={{
          marginRight: {
            xs: open ? 0 : "-100%",
            md: open ? 0 : `${-drawerWidth}px`,
          },
        }}
        open={open}
      >
        <DrawerHeader />
        <Container>
          <YouTube
            className={styles.player}
            videoId={selectedVideo}
            opts={opts}
            onReady={(e) => setEvent(e)}
            onStateChange={onChange}
            onEnd={onEnd}
            ref={playerRef}
          />
          <CustomTabs
            onDurationChange={onDurationChange}
            videoInfo={videoInfo}
            event={event}
            playlistId={playlist.playlistId}
          />
        </Container>
      </Main>
      <Drawer
        sx={{
          width: { xs: "100%", md: drawerWidth },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { xs: "100%", md: drawerWidth },
            background: "#000",
            color: "#fff",
            zIndex: { xs: "99", md: "0" },
          },
          zIndex: open ? "111" : "-1",
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, color: "#fff" }}
            component="div"
          >
            {playlist.playlistTitle}
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {playlist.playlistItems.map((item, index) => (
            <div key={item.contentDetails.videoId}>
              <ListItemButton
                selected={item.contentDetails.videoId === selectedVideo}
                alignItems="center"
                sx={{ gap: 2 }}
                onClick={() => handleOnVideoClick(item.contentDetails.videoId)}
              >
                <ListItemAvatar>
                  <img
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={item.thumbnail?.url}
                    alt={item.title ? item.title : "Video"}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title ? item.title : "Title"}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", color: "#fff" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {playlist.channelTitle}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
              <Divider sx={{ borderColor: "rgb(205 205 205 / 21%)" }} />
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
