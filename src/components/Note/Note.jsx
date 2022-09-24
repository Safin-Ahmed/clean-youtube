import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { calculateTime } from "../../utils/time";
import CreateNoteButton from "./CreateNoteButton";
import NoteList from "./NoteList";

const Note = ({ event, videoId, videoInfo, onDurationChange, playlistId }) => {
  const time = calculateTime(event?.target.getCurrentTime());
  const notes = useStoreState((state) => state.notes).data[playlistId]?.[
    videoId
  ];
  const [elapsed, setElapsed] = useState(time);
  console.log("Elapsed: ", elapsed);
  useEffect(() => {
    if (event.data === 2) {
      return;
    }
    const interval = setInterval(async () => {
      // const elapsed_sec = event.getCurrentTime(); // 60s

      // const elapsed_ms = Math.floor(elapsed_sec * 1000); // 6000
      // const ms = elapsed_ms % 1000; // 0
      // const min = Math.floor(elapsed_ms / 60000); // 0.1
      // const seconds = Math.floor((elapsed_ms - min * 60000) / 1000); // 6
      const newTime = calculateTime(event?.target.getCurrentTime());
      setElapsed(newTime);
    }, 100); // 100ms refresh

    return () => {
      clearInterval(interval);
    };
  }, [event]);
  return (
    <>
      <CreateNoteButton
        elapsed={elapsed}
        videoId={videoId}
        playlistId={playlistId}
      />
      {notes && (
        <NoteList
          notes={notes}
          videoId={videoId}
          videoTitle={videoInfo.title}
          onDurationChange={onDurationChange}
          playlistId={playlistId}
        />
      )}
    </>
  );
};

export default Note;
