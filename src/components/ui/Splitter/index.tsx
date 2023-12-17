import { DragStartEndHandler } from "@/models/common";
import { Box, BoxProps } from "@mui/material";
import React, { MouseEvent } from "react";

interface SplitterProps {
  height?: number;
  width?: number;
  zIndex?: number;
  orientation: "horizontal" | "vertical";
  onDragStart: DragStartEndHandler;
}

const orientationBasedStyle = {
  horizontal: {
    borderBottom: "1px solid gray",
    cursor: "ns-resize",
  },
  vertical: {
    borderRight: "1px solid gray",
    cursor: "ew-resize",
  },
};

export function Splitter({
  zIndex,
  width = 4,
  height = 4,
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
      }}
      zIndex={zIndex}
      sx={{
        "&:hover": {
          background: "blue",
        },
        ...orientationBasedStyle[orientation],
      }}
    />
  );
}
