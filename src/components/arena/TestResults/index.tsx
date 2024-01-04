import { Typography } from "@mui/material";
import React from "react";

interface TestResultsProps {
  testResults?: any[];
}

// TODO: implement test results and test result type
export function TestResults({ testResults }: any) {
  return (
    <Typography variant="subtitle1">
      You didn&apos;t run the code yet
    </Typography>
  );
}
