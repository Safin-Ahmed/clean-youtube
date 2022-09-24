import { Box } from "@mui/material";
import React from "react";
import SingleNote from "./SingleNote";

const NoteList = ({
  notes,
  videoId,
  videoTitle,
  onDurationChange,
  playlistId,
}) => {
  return (
    <div>
      <Box>
        {Object.keys(notes).map((item, index) => {
          const note = notes[item];
          return (
            <SingleNote
              key={`${videoId}note-${index}`}
              note={note}
              videoTitle={videoTitle}
              videoId={videoId}
              onDurationChange={onDurationChange}
              playlistId={playlistId}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default NoteList;
