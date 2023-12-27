import { TestCaseInput } from ".";

export interface TestCase {
  id: number;
  name: string;
  parameters: TestCaseInput[];
}

export interface ExecutedTestCase extends TestCase {
  testOutput?: string;
  expectedOutput?: string;
}
