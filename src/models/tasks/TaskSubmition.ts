import { TaskSubmitionStatus } from ".";

export interface TaskSubmition {
  id: number;
  status: TaskSubmitionStatus;
  language: string;
}
