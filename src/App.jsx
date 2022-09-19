import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import usePlaylists from "./hooks/usePlaylists";
import { useStoreActions } from "easy-peasy";
import Navbar from "./components/UI/Navbar";
import Home from "./components/Home/Home";

const playlistId = "PL_XxuZqN0xVAu_dWUVFbscqZdTzE8t6Z1";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
