import { action, persist } from "easy-peasy";

const indexModel = persist({
  data: {},
  addIndex: action((state, payload) => {
    state.data[payload.playlistId] = {
      index: payload.index,
      total: payload.total,
    };
  }),
});
