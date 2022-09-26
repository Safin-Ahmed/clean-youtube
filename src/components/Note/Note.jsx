import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import useElapse from "../../hooks/useElapse";
import { calculateTime } from "../../utils/time";
import CreateNoteButton from "./CreateNoteButton";
import NoteList from "./NoteList";

const Note = ({ event, videoId, videoInfo, onDurationChange, playlistId }) => {
  const notes = useStoreState((state) => state.notes).data[playlistId]?.[
    videoId
  ];

  const { elapsed } = useElapse(event);
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
