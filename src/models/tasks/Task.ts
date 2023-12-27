import { TaskSubmition, TestCase } from ".";

export interface Task {
  id: number;
  title: string;
  description: string;
  defaultCode: string;
  language: string;
  testCases: TestCase[];
  solved: boolean;
  submitions: TaskSubmition[];
}
