import { DragStartEndHandler } from "@/models/common";
import { Box } from "@mui/material";
import React, { MouseEvent } from "react";

interface HorizontalSplitterProps {
  width: number;
  zIndex: number;
  onDragStart: DragStartEndHandler;
}

export function HorizontalSplitter({
  zIndex,
  width,
  onDragStart,
}: HorizontalSplitterProps) {
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
        width,
      }}
      zIndex={zIndex}
      sx={{
        "&:hover": {
          background: "blue",
        },
        height: 4,
        borderBottom: "1px solid gray",
        cursor: "ns-resize",
      }}
    />
  );
}
