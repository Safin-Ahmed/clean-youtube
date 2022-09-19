import { action, persist } from "easy-peasy";

const recentModel = persist({
  items: [],
  addToRecent: action((state, payload) => {
    state.items.unshift(payload);
    state.items = state.items.slice(0, 5);
  }),
});

export default recentModel;
