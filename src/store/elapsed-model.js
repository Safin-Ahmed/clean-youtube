import { action, persist } from "easy-peasy";

export const elapsedModel = persist(
  {
    data: {},
    addElapse: action((state, payload) => {
      if (!payload.videoId || !payload.elapsed || !payload.playlistId) {
        return;
      }
      if (!state.data[payload.playlistId]) {
        state.data[payload.playlistId] = {
          [payload.videoId]: payload.elapsed,
        };

        return;
      } else {
        state.data[payload.playlistId][payload.videoId] = payload.elapsed;
        return;
      }
    }),
    removePlaylistElapse: action((state, payload) => {
      if (!state.data[payload]) {
        return;
      }

      delete state.data[payload];
    }),

    removeVideoElapse: action((state, payload) => {
      if (
        !state.data[payload.playlistId] ||
        !state.data[payload.playlistId][payload.videoId]
      ) {
        return;
      }

      delete state.data[payload.playlistId][payload.videoId];
    }),
  },
  {
    storage: "localStorage",
  }
);
