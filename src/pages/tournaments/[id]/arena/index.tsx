"use client";
import { PlayerLayout } from "@/layouts";
import { NextPageContext } from "next";
import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Button, Typography } from "@mui/material";
import { useSplitter, useLayoutSize, useTimeout } from "@/hooks/common";
import {
  FlexibleBox,
  ScreenSizeButton,
  TabButton,
  Tabbar,
  Splitter,
} from "@/components/ui";
import { TestCases } from "@/components/arena";
import { getTasksByTournamentId } from "@/services/taskService";
import { Task } from "@/models/tasks";
import moment from "moment";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

interface ArenaProps {
  tasks: Task[];
}

export default function Arena(props: ArenaProps) {
  const layoutSize = useLayoutSize({ heightDifference: 70 });
  const [descriptionMaximzed, setDescriptionMaximized] = useState(false);
  const [editorMaximzed, setEditorMaximized] = useState(false);
  const [testCasesMaximzed, setTestCasesMaximized] = useState(false);
  const duration = useTimeout(new Date(2023, 11, 30, 2, 0));
  const {
    splitterPosition: verticalSplitterPosition,
    setSplitterPosition: setVerticalSplitterPosition,
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
  const milliseconds = duration.asMilliseconds();
  return (
    <PlayerLayout
      headerChildren={
        <>
          <Typography suppressHydrationWarning variant="h4">
            {milliseconds > 0
              ? moment.utc(milliseconds).format("HH:mm:ss")
              : ""}
          </Typography>
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
          <FlexibleBox
            height={layoutSize.height}
            width={
              descriptionMaximzed
                ? layoutSize.width
                : layoutSize.width / 2 + verticalSplitterPosition
            }
          >
            <Tabbar>
              <ScreenSizeButton
                onClick={toggleDescriptionSize}
                maximized={descriptionMaximzed}
              />
              <Box display="flex" flexDirection="row">
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
          <Box
            width={
              editorMaximzed || testCasesMaximzed
                ? layoutSize.width
                : layoutSize.width / 2 - verticalSplitterPosition
            }
            display="flex"
            flexWrap="wrap"
          >
            {!(descriptionMaximzed || testCasesMaximzed) && (
              <FlexibleBox
                width={
                  editorMaximzed
                    ? layoutSize.width
                    : layoutSize.width / 2 - verticalSplitterPosition
                }
                height={
                  editorMaximzed
                    ? layoutSize.height - 40
                    : layoutSize.height / 2 + horizontalSplitterPosition
                }
              >
                <Tabbar>
                  <ScreenSizeButton
                    maximized={editorMaximzed}
                    onClick={toggleEditorSize}
                  />
                  <TabButton selected={true}>Code</TabButton>
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
                <Tabbar>
                  <ScreenSizeButton
                    maximized={testCasesMaximzed}
                    onClick={toggleTestCasesSize}
                  />
                  <TabButton selected={true}>Testcase</TabButton>
                </Tabbar>
                <Box height={testCasesHeight - 48} overflow="auto">
                  {!!selectedTask.testCases && (
                    <TestCases data={selectedTask.testCases} />
                  )}
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
