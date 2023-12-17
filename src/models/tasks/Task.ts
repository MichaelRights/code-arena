import { TaskSubmition, TestCase } from ".";

export interface Task {
  id: number;
  name: string;
  description: string;
  defaultCode: string;
  language: string;
  testCases: TestCase[];
  solved: boolean;
  submitions: TaskSubmition[];
}
