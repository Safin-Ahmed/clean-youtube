export const calculateTime = (time) => {
  const elapsed_sec = time; // 60s

  const elapsed_ms = Math.floor(elapsed_sec * 1000); // 6000
  const ms = elapsed_ms % 1000; // 0
  const min = Math.floor(elapsed_ms / 60000); // 0.1
  const seconds = Math.floor((elapsed_ms - min * 60000) / 1000); // 6

  return (
    min.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
  );
};

export const convertStringTimeToSecs = (time) => {
  const times = time?.split(":");

  const sec = +times[1];
  const minToSec = +(times[0] * 60);

  return sec + minToSec;
};
