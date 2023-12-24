import { TabButton } from "@/components/ui";
import { TestCase } from "@/models/tasks";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { TestCaseField } from "..";

interface TestCasesProps {
  data: TestCase[];
}

export function TestCases({ data }: TestCasesProps) {
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase>(data[0]);
  return (
    <Box display="flex" flexDirection="column" p={2} overflow="auto">
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
        {data.map((tc) => {
          return (
            <TabButton
              selected={selectedTestCase.id === tc.id}
              variant="outlined"
              onClick={() => {
                setSelectedTestCase(tc);
              }}
              key={tc.id}
            >
              {tc.name}
            </TabButton>
          );
        })}
      </Box>
      <Box display="flex" flexDirection="column" gap={1} mt={2}>
        <TestCaseField label="Input">
          {selectedTestCase.testInput}
        </TestCaseField>

        <TestCaseField label="Output">
          {selectedTestCase.testOutput}
        </TestCaseField>
        <TestCaseField label="Expected">
          {selectedTestCase.testExpected}
        </TestCaseField>
      </Box>
    </Box>
  );
}
