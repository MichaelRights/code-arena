import { DragStartEndHandler } from "@/models/common";
import { Box } from "@mui/material";
import React, { MouseEvent } from "react";

const orientationBasedStyle = {
  horizontal: {
    outline: "0.5px solid white",
    outlineOffset: "-20vw",
    cursor: "ns-resize",
  },
  vertical: {
    outline: "0.5px solid white",
    outlineOffset: "-30vh",
    cursor: "ew-resize",
  },
};

interface SplitterProps {
  height?: number;
  width?: number;
  zIndex?: number;
  orientation: "horizontal" | "vertical";
  onDragStart: DragStartEndHandler;
}

export function Splitter({
  zIndex,
  width = 6,
  height = 6,
  orientation,
  onDragStart,
}: SplitterProps) {
  return (
    <Box
      onDrag={(e) => e.stopPropagation()}
      onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onDragStart({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      style={{
        height,
        width,
        minWidth: width,
        minHeight: height,
      }}
      zIndex={zIndex}
      sx={{
        "&:hover": {
          background: "#1338BE",
        },
        borderRadius: 20,
        ...orientationBasedStyle[orientation],
      }}
    />
  );
}
