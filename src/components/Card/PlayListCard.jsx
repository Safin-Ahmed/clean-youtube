import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions, Chip } from "@mui/material";
import {
  FavoriteBorderOutlined,
  PlayCircleOutline,
  PlaylistRemoveOutlined,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./PlayListCard.module.css";
import { useStore, useStoreActions, useStoreState } from "easy-peasy";
import { Link, useNavigate } from "react-router-dom";

export default function PlayListCard({ playlist }) {
  const navigate = useNavigate();
  const favoriteActions = useStoreActions((action) => action.favorites);
  const noteActions = useStoreActions((action) => action.notes);
  const recentActions = useStoreActions((action) => action.recents);
  const playlistActions = useStoreActions((action) => action.playlist);
  const videoIdActions = useStoreActions((action) => action.videoId);
  const elapsedActions = useStoreActions((action) => action.elapsed);
  const favoriteState = useStoreState((state) => state.favorites);
  const isFavorite = favoriteState.items.find(
    (item) => item === playlist.playlistId
  );
  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!isFavorite) {
      favoriteActions.addToFavorite(playlist.playlistId);
    } else {
      favoriteActions.removeFromFavorite(playlist.playlistId);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    playlistActions.removePlaylist(playlist.playlistId);
    favoriteActions.removeFromFavorite(playlist.playlistId);
    recentActions.removeFromRecent(playlist.playlistId);
    noteActions.removePlaylistNote(playlist.playlistId);
    videoIdActions.removeVideoId(playlist.playlistId);
    elapsedActions.removePlaylistElapse(playlist.playlistId);
  };

  return (
    <div
      onClick={() => navigate(`/playlist/${playlist.playlistId}`)}
      className={styles.cardWrapper}
    >
      <Card
        sx={{
          background: "none",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={`${playlist.playlistThumbnail.url}`}
          alt={playlist.playlistTitle}
        />
        <CardContent>
          <a
            target="_blank"
            href={`https://www.youtube.com/channel/${playlist.channelId}`}
          >
            <Chip
              sx={{ color: "#fff", cursor: "pointer", mb: 2 }}
              label={playlist.channelTitle}
              variant="outlined"
            />
          </a>
          <Typography
            sx={{ color: "#fff" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {playlist.playlistTitle}
          </Typography>
          <Typography sx={{ color: "#e4e1e1" }} variant="body2">
            {playlist.playlistDescription.slice(0, 250) + "..."}
          </Typography>
        </CardContent>

        <Box sx={{ flexGrow: 1 }}></Box>
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          <Link to={`/playlist/${playlist.playlistId}`}>
            <Button
              sx={{ color: "white", cursor: "pointer" }}
              startIcon={<PlayCircleOutline sx={{ color: "red" }} />}
            >
              Start Course
            </Button>
          </Link>
          <div className={styles.rfActions}>
            <Button onClick={handleFavorite}>
              {isFavorite && <FavoriteIcon sx={{ color: "red" }} />}
              {!isFavorite && <FavoriteBorderOutlined sx={{ color: "red" }} />}
            </Button>

            <Button onClick={handleRemove}>
              <PlaylistRemoveOutlined sx={{ color: "red" }} />
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
