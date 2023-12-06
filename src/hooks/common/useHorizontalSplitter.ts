import { useEffect, useRef, useState } from "react";

// TODO: add this params
interface HorizontalSplitterParams {
  leftThreshold?: number;
  rightThreshold?: number;
}

export function useHorizontalSplitter() {
  const [horizontalSplitterPosition, setHorizontalSplitterPosition] =
    useState(0);

  const horizontalSplitterUpdateIntervalId = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!horizontalSplitterUpdateIntervalId.current) {
        if (e.key === "ArrowUp") {
          horizontalSplitterUpdateIntervalId.current = window.setInterval(
            () => {
              setHorizontalSplitterPosition((prev) => prev - 10);
            },
            50
          );
        } else if (e.key === "ArrowDown") {
          horizontalSplitterUpdateIntervalId.current = window.setInterval(
            () => {
              setHorizontalSplitterPosition((prev) => prev + 10);
            },
            50
          );
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        clearInterval(horizontalSplitterUpdateIntervalId.current);
        horizontalSplitterUpdateIntervalId.current = 0;
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { horizontalSplitterPosition, setHorizontalSplitterPosition };
}
