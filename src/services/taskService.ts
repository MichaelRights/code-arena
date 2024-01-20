import { TASKS, TESTCASES } from "@/data";
import { ExecutedTestCase, Task, TaskSubmition } from "@/models/tasks";

export function getTasksByTournamentId(tournamentId: string) {
  return new Promise<Task[]>((resolve) => {
    resolve(TASKS);
  });
}

function executeCode(code: string) {
  try {
    return eval(code);
  } catch (e: any) {
    return e.message;
  }
}

export function runTestCases(
  tournamentId: string,
  taskId: number,
  code: string,
  language: string
) {
  const promise = new Promise<ExecutedTestCase[]>((resolve) => {
    setTimeout(() => {
      const testResults = TESTCASES.map<ExecutedTestCase>((testCase) => {
        const wrappedCode = `${code}
        logTarget(${testCase.parameters.map((p) => p.value).toString()});`;

        return {
          id: testCase.id,
          name: testCase.name,
          parameters: testCase.parameters,
          expectedOutput: testCase.parameters[0].value,
          testOutput: executeCode(wrappedCode),
        };
      });
      resolve(testResults);
    }, 1000);
  });
  return promise;
}

export function submitCode(
  tournamentId: string,
  taskId: number,
  code: string,
  language: string
) {
  const promise = new Promise<TaskSubmition>((resolve) => {
    setTimeout(() => {
      let i = 0;
      for (const testCase of TESTCASES) {
        const wrappedCode = `${code}
    logTarget(${testCase.parameters.map((p) => p.value).toString()});`;
        const result = executeCode(wrappedCode);
        if (result !== testCase.parameters[0].value) {
          break;
        }
        i++;
      }
      if (i !== TESTCASES.length) {
        const testCase = TESTCASES[i];
        const wrappedCode = `${code}
    logTarget(${testCase.parameters.map((p) => p.value).toString()});`;
        resolve({
          id: Date.now(),
          language,
          status: {
            color: "red",
            id: 1,
            name: "Wrong Answer",
          },
          date: new Date(),
          testCase: {
            ...testCase,
            testOutput: eval(wrappedCode),
            expectedOutput: testCase.parameters[0].value,
          },
        });
      } else {
        resolve({
          id: Date.now(),
          language,
          date: new Date(),
          status: {
            color: "lightgreen",
            id: 2,
            name: "Accepted",
          },
        });
      }
    }, 1000);
  });
  return promise;
}
