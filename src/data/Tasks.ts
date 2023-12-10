import { TestCase } from "@/models/arena";

export const TESTCASES: TestCase[] = [
  {
    id: 1,
    name: "TestCase 1",
    testInput: "[4,5,6]",
    testOutput: "[4]",
    testExpected: "[6,5,4]",
  },
  {
    id: 2,
    name: "TestCase 2",
    testInput: "[4,5]",
    testOutput: "[5,4]",
    testExpected: "[5,4]",
  },
];
