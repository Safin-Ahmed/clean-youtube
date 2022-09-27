import { useEffect, useState } from "react";
import { calculateTime } from "../utils/time";

const useElapse = (event) => {
  const time = calculateTime(event?.target.getCurrentTime());

  const [elapsed, setElapsed] = useState(time);
  console.log({ time });
  useEffect(() => {
    if (event?.data === 2) {
      return;
    }

    if (event?.data === 0) {
      setElapsed(0);
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

  return { elapsed };
};

export default useElapse;
