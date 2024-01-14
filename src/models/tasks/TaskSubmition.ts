import { ExecutedTestCase, TaskSubmitionStatus } from ".";

export interface TaskSubmition {
  id: number;
  status: TaskSubmitionStatus;
  language: string;
  date: Date;
  testCase?: ExecutedTestCase;
}
