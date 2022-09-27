import { createStore } from "easy-peasy";
import { elapsedModel } from "./elapsed-model";
import favoriteModel from "./favorite-model";
import noteModel from "./note-model";
import playlistModel from "./playlist-model";
import recentModel from "./recent-model";
import { videoIdModel } from "./videoId-model";

const store = createStore({
  playlist: playlistModel,
  favorites: favoriteModel,
  recents: recentModel,
  notes: noteModel,
  videoId: videoIdModel,
  elapsed: elapsedModel,
});

export default store;
