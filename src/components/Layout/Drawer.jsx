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
import { ListItemAvatar } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";
import styles from "./Drawer.module.css";
import { CleaningServicesOutlined } from "@mui/icons-material";

const drawerWidth = 500;

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
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get("video");
  const [selectedVideo, setSelectedVideo] = React.useState("");
  React.useEffect(() => {
    setSelectedVideo(videoId);
  }, [videoId]);
  const videoInfo = playlist.playlistItems.find(
    (item) => item.contentDetails.videoId === videoId
  );

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
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
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0,
    },
  };

  const onReady = (e) => {};

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ background: "#FF0000" }} position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <CleaningServicesOutlined
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                ml: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
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
              component="a"
              href=""
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
      <Main open={open}>
        <DrawerHeader />
        <div className={styles.playerWrapper}>
          <YouTube videoId={selectedVideo} opts={opts} onReady={onReady} />
          <div className={styles.title}>
            <Typography variant="h6">{videoInfo.title}</Typography>
          </div>
          <div className={styles.description}>
            <Typography variant="body2">{videoInfo.description}</Typography>
          </div>
        </div>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
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
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Playlist Contents
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {playlist.playlistItems.map((item, index) => (
            <>
              <ListItemButton
                key={item.contentDetails.videoId}
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
                    src={item.thumbnail.url}
                    alt={item.title}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
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
              <Divider />
            </>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
