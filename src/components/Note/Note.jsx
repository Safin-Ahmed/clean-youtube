import React, { useEffect, useState } from "react";

const Note = ({ event }) => {
  const [elapsed, setElapsed] = useState(0);
  console.log("Elapsed: ", elapsed);
  useEffect(() => {
    if (!event) {
      return;
    }
    const interval = setInterval(async () => {
      console.log(event.getCurrentTime());
      const elapsed_sec = event.getCurrentTime();

      const elapsed_ms = Math.floor(elapsed_sec * 1000); // 6000
      const ms = elapsed_ms % 1000; // 0
      const min = Math.floor(elapsed_ms / 60000); // 0.1
      const seconds = Math.floor((elapsed_ms - min * 60000) / 1000); // 6

      setElapsed(
        min.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0") +
          ":" +
          ms.toString().padStart(3, "0")
      );
    }, 100); // 100ms refresh

    return () => {
      clearInterval(interval);
    };
  }, [event]);
  return <div>Time: {elapsed}</div>;
};

export default Note;
