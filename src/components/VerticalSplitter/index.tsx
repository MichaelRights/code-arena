import { Divider } from "@mui/material";
import React from "react";

interface VerticalSplitterProps {
  height: number;
}

export function VerticalSplitter({ height }: VerticalSplitterProps) {
  return (
    <Divider
      color="red"
      orientation="vertical"
      sx={{ height, cursor: "ew-resize" }}
    >
      ‖
    </Divider>
  );
}
