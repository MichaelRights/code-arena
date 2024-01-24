"use client";
import { PlayerLayout } from "@/layouts";
import { NextPageContext } from "next";
import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Button } from "@mui/material";
import { useSplitter, useLayoutSize } from "@/hooks/common";
import {
  FlexibleBox,
  ScreenSizeButton,
  TabButton,
  Tabbar,
  Splitter,
  Timer,
} from "@/components/ui";
import {
  TaskDescription,
  TaskListDrawer,
  TaskSubmissions,
  TestCases,
  TestResults,
} from "@/components/arena";
import { getTaskById, getTasksByTournamentId } from "@/services/taskService";
import { Task } from "@/models/tasks";
import {} from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useArenaStore } from "@/hooks/tournaments";
const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

interface ArenaProps {
  tasks: Task[];
  task: Task;
  tournamentId: string;
}
enum TestCaseTabs {
  TEST_CASE,
  TEST_RESULT,
}
enum TaskDetailsTab {
  DESCRIPTION,
  SUBMISSIONS,
}

export default function Arena(props: ArenaProps) {
  const [testCaseTab, setTestCaseTab] = useState(TestCaseTabs.TEST_CASE);
  const [taskDetailsTab, setTaskDetailsTab] = useState(
    TaskDetailsTab.DESCRIPTION
  );
  const layoutSize = useLayoutSize({ heightDifference: 70 });
  const [descriptionMaximzed, setDescriptionMaximized] = useState(false);
  const [editorMaximzed, setEditorMaximized] = useState(false);
  const [testCasesMaximzed, setTestCasesMaximized] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const selectedTask = props.task;
  const runCode = useArenaStore((store) => store.runCode);
  const submitCode = useArenaStore((store) => store.submitCode);

  const {
    splitterPosition: verticalSplitterPosition,
    handleDragStart: handleVerticalSplitterDragStart,
  } = useSplitter({
    orientation: "vertical",
  });

  const {
    splitterPosition: horizontalSplitterPosition,
    handleDragStart: handleHorizontalSplitterDragStart,
  } = useSplitter({
    orientation: "horizontal",
  });

  const toggleDescriptionSize = useCallback(() => {
    setDescriptionMaximized((prev) => !prev);
  }, []);

  const toggleEditorSize = useCallback(() => {
    setEditorMaximized((prev) => !prev);
  }, []);

  const toggleTestCasesSize = useCallback(() => {
    setTestCasesMaximized((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(() => {
    setTaskDetailsTab(TaskDetailsTab.SUBMISSIONS);
    const code = editorRef.current!.getValue();
    submitCode(
      props.tournamentId,
      selectedTask.id,
      code,
      selectedTask.language
    );
  }, [editorRef, selectedTask]);

  const handleRunTestCases = useCallback(() => {
    setTestCaseTab(TestCaseTabs.TEST_RESULT);
    const code = editorRef.current!.getValue();
    runCode(props.tournamentId, selectedTask.id, code, selectedTask.language);
  }, [editorRef, selectedTask]);

  const testCasesHeight = testCasesMaximzed
    ? layoutSize.height
    : layoutSize.height / 2 - horizontalSplitterPosition - 6;

  const descriptionWidth = descriptionMaximzed
    ? layoutSize.width
    : layoutSize.width / 2 + verticalSplitterPosition;

  const editorWidth = editorMaximzed
    ? layoutSize.width
    : layoutSize.width / 2 - verticalSplitterPosition;

  const editorHeight = editorMaximzed
    ? layoutSize.height
    : layoutSize.height / 2 + horizontalSplitterPosition;

  const secondColumnWidth =
    editorMaximzed || testCasesMaximzed
      ? layoutSize.width
      : layoutSize.width / 2 - verticalSplitterPosition;

  const splittersVisible = !(
    editorMaximzed ||
    descriptionMaximzed ||
    testCasesMaximzed
  );
  return (
    <PlayerLayout
      headerChildren={
        <>
          <Timer endDate={new Date(2024, 0, 14, 23, 0)} />
          <Box display="flex" alignItems="center" height={32} gap={1}>
            <Button variant="outlined" onClick={handleRunTestCases}>
              Run
            </Button>
            <Button color="success" onClick={handleSubmit} variant="contained">
              Submit
            </Button>
            <TaskListDrawer
              tasks={props.tasks}
              tournamentId={props.tournamentId}
            />
          </Box>
        </>
      }
    >
      <Box display="flex" flexDirection="row">
        {!(editorMaximzed || testCasesMaximzed) && (
          <FlexibleBox
            style={{ width: descriptionWidth, height: layoutSize.height }}
          >
            <Tabbar alignItems="center">
              <ScreenSizeButton
                onClick={toggleDescriptionSize}
                maximized={descriptionMaximzed}
              />
              <Box>
                <TabButton
                  onClick={() => setTaskDetailsTab(TaskDetailsTab.DESCRIPTION)}
                  selected={TaskDetailsTab.DESCRIPTION === taskDetailsTab}
                >
                  Description
                </TabButton>
                <TabButton
                  onClick={() => setTaskDetailsTab(TaskDetailsTab.SUBMISSIONS)}
                  selected={TaskDetailsTab.SUBMISSIONS === taskDetailsTab}
                >
                  Submissions
                </TabButton>
              </Box>
            </Tabbar>
            {taskDetailsTab === TaskDetailsTab.DESCRIPTION && (
              <TaskDescription
                description={selectedTask.description}
                solved={selectedTask.solved}
                title={selectedTask.title}
              />
            )}
            {taskDetailsTab === TaskDetailsTab.SUBMISSIONS && (
              <TaskSubmissions
                taskId={selectedTask.id}
                tournamentId={props.tournamentId}
              />
            )}
          </FlexibleBox>
        )}
        {splittersVisible && (
          <Splitter
            orientation="vertical"
            onDragStart={handleVerticalSplitterDragStart}
            height={layoutSize.height}
          />
        )}
        {!descriptionMaximzed && (
          <Box
            style={{
              width: secondColumnWidth,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {!(descriptionMaximzed || testCasesMaximzed) && (
              <FlexibleBox style={{ width: editorWidth, height: editorHeight }}>
                <Tabbar alignItems="center">
                  <ScreenSizeButton
                    maximized={editorMaximzed}
                    onClick={toggleEditorSize}
                  />
                  <Box>
                    <TabButton selected={true}>Code</TabButton>
                  </Box>
                </Tabbar>
                <Editor
                  onMount={(editor) => {
                    editorRef.current = editor;
                  }}
                  options={{
                    suggest: {
                      showIcons: false,
                    },

                    minimap: {
                      enabled: false,
                    },
                  }}
                  height={editorHeight - 48}
                  defaultLanguage={selectedTask.language}
                  defaultValue={selectedTask.defaultCode}
                  theme="vs-dark"
                />
              </FlexibleBox>
            )}

            {splittersVisible && (
              <Splitter
                orientation="horizontal"
                zIndex={1}
                onDragStart={handleHorizontalSplitterDragStart}
                width={layoutSize.width / 2 - verticalSplitterPosition}
              />
            )}
            {!(editorMaximzed || descriptionMaximzed) && (
              <FlexibleBox style={{ height: testCasesHeight }} width="100%">
                <Tabbar alignItems="center">
                  <ScreenSizeButton
                    maximized={testCasesMaximzed}
                    onClick={toggleTestCasesSize}
                  />
                  <Box>
                    <TabButton
                      onClick={() => setTestCaseTab(TestCaseTabs.TEST_CASE)}
                      selected={TestCaseTabs.TEST_CASE == testCaseTab}
                    >
                      Testcase
                    </TabButton>
                    <TabButton
                      onClick={() => setTestCaseTab(TestCaseTabs.TEST_RESULT)}
                      selected={TestCaseTabs.TEST_RESULT == testCaseTab}
                    >
                      Test Result
                    </TabButton>
                  </Box>
                </Tabbar>
                <Box style={{ height: testCasesHeight - 48 }} overflow="auto">
                  {TestCaseTabs.TEST_CASE === testCaseTab &&
                    !!selectedTask.testCases && (
                      <TestCases data={selectedTask.testCases} />
                    )}
                  {TestCaseTabs.TEST_RESULT === testCaseTab && <TestResults />}
                </Box>
              </FlexibleBox>
            )}
          </Box>
        )}
      </Box>
    </PlayerLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const id = context.query.id as string;
  let taskId;
  if (context.query.slug) {
    taskId = (context.query.slug as string[]).shift();
  }
  const tasks = await getTasksByTournamentId(id);
  let task: Task;
  if (taskId) {
    const selectedTask = await getTaskById(Number.parseInt(taskId));
    if (selectedTask) {
      task = selectedTask;
    } else {
      task = (await getTaskById(tasks[0].id))!;
    }
  } else {
    task = (await getTaskById(tasks[0].id))!;
  }

  return { props: { tournamentId: id, tasks, task } };
}
