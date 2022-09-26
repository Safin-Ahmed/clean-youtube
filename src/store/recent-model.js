import { action, persist } from "easy-peasy";

const recentModel = persist(
  {
    items: [],
    addToRecent: action((state, payload) => {
      console.log({ payload });
      if (state.items.includes(payload)) {
        console.log("Item is already includes");
        state.items = state.items.filter((item) => item !== payload);
        state.items.unshift(payload);
      } else {
        state.items.unshift(payload);
      }
      if (state.items.length > 5) {
        state.items = state.items.slice(0, 5);
      }
    }),
    removeFromRecent: action((state, payload) => {
      if (!state.items.includes(payload)) {
        return;
      }
      state.items = state.items.filter((item) => item !== payload);
    }),
  },
  {
    storage: "localStorage",
  }
);

export default recentModel;
