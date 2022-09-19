import { StoreProvider } from "easy-peasy";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Favorites from "./components/Favorites/Favorites";
import Playlist from "./components/Playlist/Playlist";
import Recents from "./components/Recents/Recents";
import Layout from "./components/UI/Layout";
import "./index.css";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "/recents",
        element: <Recents />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "/playlist/:playlistId",
    element: <Playlist />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <RouterProvider router={router} />
  </StoreProvider>
);
