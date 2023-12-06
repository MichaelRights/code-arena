import { useEffect, useRef, useState } from "react";

// TODO: add this params
interface VerticalSplitterParams {
  leftThreshold?: number;
  rightThreshold?: number;
}

export function useVerticalSplitter() {
  const [verticalSplitterPosition, setVerticalSplitterPosition] = useState(0);

  const verticalSplitterUpdateIntervalId = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!verticalSplitterUpdateIntervalId.current) {
        if (e.key === "ArrowLeft") {
          verticalSplitterUpdateIntervalId.current = window.setInterval(() => {
            setVerticalSplitterPosition((prev) => prev - 10);
          }, 50);
        } else if (e.key === "ArrowRight") {
          verticalSplitterUpdateIntervalId.current = window.setInterval(() => {
            setVerticalSplitterPosition((prev) => prev + 10);
          }, 50);
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        clearInterval(verticalSplitterUpdateIntervalId.current);
        verticalSplitterUpdateIntervalId.current = 0;
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { verticalSplitterPosition, setVerticalSplitterPosition };
}
