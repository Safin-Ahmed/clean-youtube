import { action, persist, thunk } from "easy-peasy";
import getPlaylist from "../api";

const playlistModel = persist({
  data: {},
  error: "",
  isLoading: false,
  addPlaylist: action((state, payload) => {
    state.data[payload.playlistId] = payload;
  }),
  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  getPlaylist: thunk(async (action, payload, { getState }) => {
    if (getState().data[payload]) {
      console.log("API Call Cancelled");
      return;
    }

    action.setLoading(true);
    try {
      const playlist = await getPlaylist(payload);
      action.addPlaylist(playlist);
    } catch (e) {
      action.setError(
        e.response?.data?.error?.message || "Something went wrong"
      );
    } finally {
      action.setLoading(false);
    }

    console.log("API CALLED");
  }),
});

export default playlistModel;
