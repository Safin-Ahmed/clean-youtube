import { createStore } from "easy-peasy";
import favoriteModel from "./favorite-model";
import noteModel from "./note-model";
import playlistModel from "./playlist-model";
import recentModel from "./recent-model";

const store = createStore({
  playlist: playlistModel,
  favorites: favoriteModel,
  recents: recentModel,
  notes: noteModel,
});

export default store;
