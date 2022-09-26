import { action, persist } from "easy-peasy";

const noteModel = persist(
  {
    data: {},
    addNote: action((state, payload) => {
      if (
        state.data[payload.playlistId] &&
        state.data[payload.playlistId][payload.videoId]
      ) {
        state.data[payload.playlistId][payload.videoId][payload.time] = {
          time: payload.time,
          note: payload.note,
        };

        return;
      }

      state.data[payload.playlistId] = {
        [payload.videoId]: {
          [payload.time]: {
            time: payload.time,
            note: payload.note,
          },
        },
      };
    }),

    removeNote: action((state, payload) => {
      if (!state.data[payload.playlistId][payload.videoId]) {
        return;
      }

      delete state.data[payload.playlistId][payload.videoId][payload.time];
    }),

    removePlaylistNote: action((state, payload) => {
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

export default noteModel;
