import { action, persist } from "easy-peasy";

export const videoIdModel = persist(
  {
    data: {},
    addVideoId: action((state, payload) => {
      state.data[payload.playlistId] = {
        videoId: payload.videoId,
        elapsed: payload.elapsed,
      };
    }),
    removeVideoId: action((state, payload) => {
      if (!state.data[payload]) {
        return;
      }

      delete state.data[payload];
    }),
  },
  {
    storage: "localStorage",
  }
);
