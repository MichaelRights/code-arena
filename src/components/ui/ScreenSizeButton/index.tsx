import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";

interface ScreenSizeButtonProps {
  maximized?: boolean;
}

export function ScreenSizeButton({
  maximized,
  ...rest
}: ScreenSizeButtonProps & IconButtonProps) {
  return (
    <IconButton {...rest}>
      {maximized ? <FullscreenExit /> : <Fullscreen />}
    </IconButton>
  );
}
