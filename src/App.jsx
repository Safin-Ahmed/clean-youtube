import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import usePlaylists from "./hooks/usePlaylists";
import { useStoreActions } from "easy-peasy";
import Navbar from "./components/UI/Navbar";

const playlistId = "PL_XxuZqN0xVAu_dWUVFbscqZdTzE8t6Z1";

function App() {
  const playlist = useStoreActions((actions) => actions.playlist);

  useEffect(() => {
    playlist.getPlaylist(playlistId);
  }, []);
  return (
    <div className="App">
      <div>Hello World!</div>
    </div>
  );
}

export default App;
