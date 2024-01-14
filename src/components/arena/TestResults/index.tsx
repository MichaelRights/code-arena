import { useArenaStore } from "@/hooks/tournaments";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { TestCaseField, TestResult } from "..";
import { TabButton } from "@/components/ui";
import { ExecutedTestCase } from "@/models/tasks";

export function TestResults() {
  const testResults = useArenaStore((state) => state.testResults);
  const executing = useArenaStore((state) => state.loadingTestResults);

  if (!testResults || executing) {
    return (
      <Box height="100%" display="flex">
        <Typography
          width="100%"
          alignSelf="center"
          textAlign="center"
          variant="subtitle1"
        >
          {executing ? "Executing..." : "You didn't run the code yet"}
        </Typography>
      </Box>
    );
  }
  return <ExecutedTestResults testResults={testResults} />;
}

const ExecutedTestResults = ({
  testResults,
}: {
  testResults: ExecutedTestCase[];
}) => {
  const [selectedTestCase, setSelectedTestCase] = useState<ExecutedTestCase>(
    testResults[0]
  );
  return (
    <Box display="flex" flexDirection="column" p={2} overflow="auto">
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
        {testResults.map((tc) => {
          return (
            <TabButton
              selected={selectedTestCase.id === tc.id}
              variant="outlined"
              onClick={() => {
                setSelectedTestCase(tc);
              }}
              key={tc.id}
            >
              <Typography
                component="p"
                color={
                  selectedTestCase.expectedOutput ===
                  selectedTestCase.testOutput
                    ? "lightgreen"
                    : "red"
                }
              >
                •&nbsp;
              </Typography>
              {tc.name}
            </TabButton>
          );
        })}
      </Box>
      <TestResult testCase={selectedTestCase} />
    </Box>
  );
};
