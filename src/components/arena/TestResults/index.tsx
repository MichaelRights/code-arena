import { ExecutedTestCase } from "@/models/tasks";
import { Box, Typography } from "@mui/material";
import React from "react";

interface TestResultsProps {
  testResults?: ExecutedTestCase[];
}

// TODO: implement test results and test result type
export function TestResults({ testResults }: TestResultsProps) {
  if (!testResults) {
    return (
      <Box height="100%" display="flex">
        <Typography
          width="100%"
          alignSelf="center"
          textAlign="center"
          variant="subtitle1"
        >
          You didn&apos;t run the code yet
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      {testResults.map((result) => (
        <Typography key={result.id}>{result.name}</Typography>
      ))}
    </Box>
  );
}
