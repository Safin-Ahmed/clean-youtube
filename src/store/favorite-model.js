import { action, persist } from "easy-peasy";

const favoriteModel = persist(
  {
    items: [],
    addToFavorite: action((state, payload) => {
      state.items.push(payload);
    }),
    removeFromFavorite: action((state, payload) => {
      state.items = state.items.filter((pId) => payload !== pId);
    }),
  },
  {
    storage: "localStorage",
  }
);

export default favoriteModel;
