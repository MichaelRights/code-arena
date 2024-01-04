import { useTimeout } from "@/hooks/common";
import { Typography, TypographyProps } from "@mui/material";
import moment from "moment";
import React from "react";

interface TimerProps {
  endDate: Date;
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
      {milliseconds > 0 ? moment.utc(milliseconds).format("HH:mm:ss") : ""}
    </Typography>
  );
}
