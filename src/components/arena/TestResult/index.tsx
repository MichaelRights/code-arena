import { ExecutedTestCase } from "@/models/tasks";
import { Box } from "@mui/material";
import React from "react";
import { TestCaseField } from "..";

interface TestResultProps {
  testCase: ExecutedTestCase;
}
export function TestResult({ testCase }: TestResultProps) {
  return (
    <Box display="flex" flexDirection="column" gap={1} mt={2}>
      {testCase.parameters.map((parameter) => (
        <TestCaseField key={parameter.key} label={`${parameter.key} =`}>
          {parameter.value}
        </TestCaseField>
      ))}
      <TestCaseField label="Expected output">
        {testCase.expectedOutput}
      </TestCaseField>
      <TestCaseField label="Output">{testCase.testOutput}</TestCaseField>
    </Box>
  );
}
