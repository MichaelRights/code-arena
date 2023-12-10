import { DragStartEndHandler } from "@/models/common";
import { Divider } from "@mui/material";
import React, { MouseEvent } from "react";

interface VerticalSplitterProps {
  height: number;
  onDragStart: DragStartEndHandler;
}

export function VerticalSplitter({
  height,
  onDragStart,
}: VerticalSplitterProps) {
  return (
    <Divider
      onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onDragStart({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      style={{
        height,
      }}
      sx={{
        "&:hover": {
          background: "blue",
        },
        width: 4,
        borderRight: "1px solid gray",
        cursor: "ew-resize",
      }}
    />
  );
}
