import { ExecutedTestCase, TaskSubmition } from "@/models/tasks";
import { runTestCases, submitCode } from "@/services/taskService";
import { create } from "zustand";

type CodeExecutionFunction = (
  tournamentId: string,
  taskId: number,
  code: string,
  language: string
) => void;

interface ArenaStore {
  name: string;
  loadingTestResults: boolean;
  loadingSubmitionResult: boolean;
  submitionResult?: TaskSubmition;
  testResults?: ExecutedTestCase[];
  runCode: CodeExecutionFunction;
  submitCode: CodeExecutionFunction;
}

export const useArenaStore = create<ArenaStore>((set) => ({
  name: "Name 1",
  testResults: undefined,
  loadingTestResults: false,
  loadingSubmitionResult: false,
  runCode: async (tournamentId, taskId, code, language) => {
    set((state) => ({ ...state, loadingTestResults: true }));
    try {
      const testResults = await runTestCases(
        tournamentId,
        taskId,
        code,
        language
      );
      set((state) => ({ ...state, testResults, loadingTestResults: false }));
    } catch {
      set((state) => ({ ...state, loadingTestResults: false }));
    }
  },
  submitCode: async (tournamentId, taskId, code, language) => {
    set((state) => ({ ...state, loadingSubmitionResult: true }));
    try {
      const submitionResult = await submitCode(
        tournamentId,
        taskId,
        code,
        language
      );
      set((state) => ({
        ...state,
        submitionResult,
        loadingSubmitionResult: false,
      }));
    } catch {
      set((state) => ({ ...state, loadingSubmitionResult: false }));
    }
  },
}));
