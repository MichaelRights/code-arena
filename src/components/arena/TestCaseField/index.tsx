import { Box, Typography } from "@mui/material";
import React from "react";

interface TestCaseFieldProps {
  label?: string;
  children?: React.ReactNode;
}

export function TestCaseField({ label, children }: TestCaseFieldProps) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography color="gray" variant="subtitle2">
        {label}
      </Typography>
      <Typography borderRadius={2} p={1} bgcolor="#353535" variant="body1">
        {children}
      </Typography>
    </Box>
  );
}
