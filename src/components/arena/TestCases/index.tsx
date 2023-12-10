import { TabButton } from "@/components/ui";
import { TestCase } from "@/models/arena";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

interface TestCasesProps {
  data: TestCase[];
}

export function TestCases({ data }: TestCasesProps) {
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase>(data[0]);
  return (
    <Box display="flex" flexDirection="column" p={2}>
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
      <Box display="flex" flexDirection="column">
        <Typography variant="body1">{selectedTestCase.testInput}</Typography>
        <Typography variant="body2">{selectedTestCase.testOutput}</Typography>
        <Typography variant="body2">{selectedTestCase.testExpected}</Typography>
      </Box>
    </Box>
  );
}
