"use client";
import { PlayerLayout } from "@/layouts";
import { NextPageContext } from "next";
import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Button, Typography } from "@mui/material";
import { useSplitter, useLayoutSize } from "@/hooks/common";
import {
  FlexibleBox,
  ScreenSizeButton,
  TabButton,
  Tabbar,
  Splitter,
  Timer,
} from "@/components/ui";
import { TestCases, TestResults } from "@/components/arena";
import { getTasksByTournamentId } from "@/services/taskService";
import { Task } from "@/models/tasks";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

interface ArenaProps {
  tasks: Task[];
}
enum TestCaseTabs {
  TEST_CASE,
  TEST_RESULT,
}
export default function Arena(props: ArenaProps) {
  const [testCaseTab, setTestCaseTab] = useState(TestCaseTabs.TEST_CASE);
  const layoutSize = useLayoutSize({ heightDifference: 70 });
  const [descriptionMaximzed, setDescriptionMaximized] = useState(false);
  const [editorMaximzed, setEditorMaximized] = useState(false);
  const [testCasesMaximzed, setTestCasesMaximized] = useState(false);
  const {
    splitterPosition: verticalSplitterPosition,
    handleDragStart: handleVerticalSplitterDragStart,
  } = useSplitter({
    orientation: "vertical",
  });

  const selectedTask = props.tasks[0];

  const {
    splitterPosition: horizontalSplitterPosition,
    handleDragStart: handleHorizontalSplitterDragStart,
  } = useSplitter({
    orientation: "horizontal",
  });

  const toggleDescriptionSize = useCallback(() => {
    setDescriptionMaximized((prev) => !prev);
  }, [descriptionMaximzed, layoutSize]);

  const toggleEditorSize = useCallback(() => {
    setEditorMaximized((prev) => !prev);
  }, [editorMaximzed, layoutSize]);

  const toggleTestCasesSize = useCallback(() => {
    setTestCasesMaximized((prev) => !prev);
  }, [testCasesMaximzed, layoutSize]);

  const testCasesHeight = testCasesMaximzed
    ? layoutSize.height
    : layoutSize.height / 2 - horizontalSplitterPosition - 4;

  const descriptionWidth = descriptionMaximzed
    ? layoutSize.width
    : layoutSize.width / 2 + verticalSplitterPosition;

  const editorWidth = editorMaximzed
    ? layoutSize.width
    : layoutSize.width / 2 - verticalSplitterPosition;

  const editorHeight = editorMaximzed
    ? layoutSize.height - 40
    : layoutSize.height / 2 + horizontalSplitterPosition;

  const secondColumnWidth =
    editorMaximzed || testCasesMaximzed
      ? layoutSize.width
      : layoutSize.width / 2 - verticalSplitterPosition;
  return (
    <PlayerLayout
      headerChildren={
        <>
          <Timer endDate={new Date(2024, 0, 3, 21, 0)} />
          <Box display="flex" alignItems="center" height={32} gap={1}>
            <Button variant="outlined">Run</Button>
            <Button color="success" variant="contained">
              Submit
            </Button>
          </Box>
        </>
      }
    >
      <Box display="flex" flexDirection="row">
        {!(editorMaximzed || testCasesMaximzed) && (
          <FlexibleBox height={layoutSize.height} width={descriptionWidth}>
            <Tabbar alignItems="center">
              <ScreenSizeButton
                onClick={toggleDescriptionSize}
                maximized={descriptionMaximzed}
              />
              <Box>
                <TabButton selected={true}>Description</TabButton>
              </Box>
            </Tabbar>
            <Box p={2} overflow="auto" height={layoutSize.height - 48}>
              <Box
                pb={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{selectedTask.title}</Typography>
                {selectedTask.solved && (
                  <Typography color="green" variant="body1">
                    Solved
                  </Typography>
                )}
              </Box>
              <div
                dangerouslySetInnerHTML={{ __html: selectedTask.description }}
              ></div>
            </Box>
          </FlexibleBox>
        )}
        <Splitter
          orientation="vertical"
          onDragStart={handleVerticalSplitterDragStart}
          height={layoutSize.height}
        />
        {!descriptionMaximzed && (
          <Box width={secondColumnWidth} display="flex" flexWrap="wrap">
            {!(descriptionMaximzed || testCasesMaximzed) && (
              <FlexibleBox width={editorWidth} height={editorHeight}>
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
                  options={{
                    suggest: {
                      showIcons: false,
                    },

                    minimap: {
                      enabled: false,
                    },
                  }}
                  defaultLanguage={selectedTask.language}
                  defaultValue={selectedTask.defaultCode}
                  theme="vs-dark"
                />
              </FlexibleBox>
            )}

            <Splitter
              orientation="horizontal"
              zIndex={1}
              onDragStart={handleHorizontalSplitterDragStart}
              width={layoutSize.width / 2 - verticalSplitterPosition}
            />
            {!(editorMaximzed || descriptionMaximzed) && (
              <FlexibleBox zIndex={2} height={testCasesHeight} width="100%">
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
                <Box height={testCasesHeight - 48} overflow="auto">
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
  const tasks = await getTasksByTournamentId(id);
  return { props: { tasks } };
}
