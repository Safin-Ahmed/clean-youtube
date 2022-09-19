import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions, Chip } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./PlayListCard.module.css";
import { useStoreActions, useStoreState } from "easy-peasy";

export default function PlayListCard({ playlist }) {
  const actions = useStoreActions((action) => action.favorites);
  const favoriteState = useStoreState((state) => state.favorites);
  const isFavorite = favoriteState.items.find(
    (item) => item === playlist.playlistId
  );
  console.log(isFavorite);
  const handleFavorite = () => {
    if (!isFavorite) {
      actions.addToFavorite(playlist.playlistId);
    } else {
      actions.removeFromFavorite(playlist.playlistId);
    }
  };
  return (
    <div className={styles.cardWrapper}>
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
          <Typography
            sx={{ color: "#fff" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {playlist.playlistTitle}
          </Typography>
          <Typography
            sx={{ color: "#fff" }}
            variant="body2"
            color="text.secondary"
          >
            {playlist.playlistDescription.slice(0, 250)}
          </Typography>
        </CardContent>

        <Box sx={{ flexGrow: 1 }}></Box>
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          <a
            target="_blank"
            href={`https://www.youtube.com/channel/${playlist.channelId}`}
          >
            <Chip
              sx={{ color: "#fff", cursor: "pointer" }}
              label={playlist.channelTitle}
              variant="outlined"
            />
          </a>
          <Button onClick={handleFavorite}>
            {isFavorite && <FavoriteIcon sx={{ color: "red" }} />}
            {!isFavorite && <FavoriteBorderOutlined sx={{ color: "red" }} />}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
