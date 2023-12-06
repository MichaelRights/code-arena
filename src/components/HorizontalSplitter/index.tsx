import { Divider } from "@mui/material";
import React from "react";

interface HorizontalSplitterProps {
  width: number;
}

export function HorizontalSplitter({ width }: HorizontalSplitterProps) {
  return (
    <Divider
      textAlign="center"
      color="red"
      sx={{
        width,
        cursor: "ns-resize",
      }}
    >
      .
    </Divider>
  );
}
