import { DragStartEndHandler } from "@/models/common";
import { useCallback, useEffect, useRef, useState } from "react";

interface SplitterParams {
  orientation: "horizontal" | "vertical";
}

const ORIENTATION_KEYS = {
  horizontal: {
    axis: "y" as "y",
    clientAxis: "clientY" as "clientY",
    arrowDecrease: "ArrowUp" as "ArrowUp",
    arrowIncrease: "ArrowDown" as "ArrowDown",
  },
  vertical: {
    axis: "x" as "x",
    clientAxis: "clientX" as "clientX",
    arrowDecrease: "ArrowLeft" as "ArrowLeft",
    arrowIncrease: "ArrowRight" as "ArrowRight",
  },
};

export function useSplitter({ orientation }: SplitterParams) {
  const [splitterPosition, setSplitterPosition] = useState(0);

  const orientationKeys = useRef(ORIENTATION_KEYS[orientation]).current;
  const splitterUpdateIntervalId = useRef(0);
  const dragStartedPoint = useRef({ x: 0, y: 0 });
  const dragStartedPosition = useRef(splitterPosition);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const difference =
      dragStartedPoint.current[orientationKeys.axis] -
      e[orientationKeys.clientAxis];
    setSplitterPosition(dragStartedPosition.current - difference);
  }, []);

  const handleDragStart = useCallback<DragStartEndHandler>(
    (position) => {
      dragStartedPoint.current = position;
      dragStartedPosition.current = splitterPosition;
      document.addEventListener("mousemove", handleMouseMove);
    },
    [splitterPosition]
  );

  const handleDragEnd = useCallback<DragStartEndHandler>((position) => {
    document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!splitterUpdateIntervalId.current) {
        if (e.key === orientationKeys.arrowDecrease) {
          splitterUpdateIntervalId.current = window.setInterval(() => {
            setSplitterPosition((prev) => prev - 10);
          }, 50);
        } else if (e.key === orientationKeys.arrowIncrease) {
          splitterUpdateIntervalId.current = window.setInterval(() => {
            setSplitterPosition((prev) => prev + 10);
          }, 50);
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.key === orientationKeys.arrowDecrease ||
        e.key === orientationKeys.arrowIncrease
      ) {
        clearInterval(splitterUpdateIntervalId.current);
        splitterUpdateIntervalId.current = 0;
      }
    };

    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return {
    splitterPosition,
    setSplitterPosition,
    handleDragStart,
  };
}
