import { useTimeout } from "@/hooks/common";
import { Typography, TypographyProps } from "@mui/material";
import moment from "moment";
import React from "react";

interface TimerProps {
  endDate: Date;
}
function formatDuration(value: number) {
  var days = Math.floor(value / 86400000);
  value = value % 86400000;
  var hours = Math.floor(value / 3600000);
  value = value % 3600000;
  var minutes = Math.floor(value / 60000);
  value = value % 60000;
  var seconds = Math.floor(value / 1000);
  return (days ? days + ":" : "") + (hours + ":") + (minutes + ":") + seconds;
}

export function Timer({ endDate, ...rest }: TimerProps & TypographyProps) {
  const duration = useTimeout(endDate);
  const milliseconds = duration.asMilliseconds();

  return (
    <Typography
      alignSelf="center"
      suppressHydrationWarning
      variant="h4"
      {...rest}
    >
      {milliseconds > 0 ? formatDuration(milliseconds) : ""}
    </Typography>
  );
}
