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
import { useArenaStore } from "@/hooks/tournaments";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
const Markdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);
import { getCodeString } from "rehype-rewrite";
// @ts-ignore
import katex from "katex";
import "katex/dist/katex.css";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

interface ArenaProps {
  tasks: Task[];
}
enum TestCaseTabs {
  TEST_CASE,
  TEST_RESULT,
}
export default function Arena(props: ArenaProps) {
  const { name } = useArenaStore();
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
    : layoutSize.height / 2 - horizontalSplitterPosition - 10;

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
          <Timer endDate={new Date(2024, 0, 9, 23, 0)} />
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
                <TabButton selected={false}>Submissions</TabButton>
              </Box>
            </Tabbar>
            <Box
              px={2.5}
              py={2}
              overflow="auto"
              height={layoutSize.height - 48}
            >
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
              <Markdown
                style={{ background: "transparent" }}
                source={selectedTask.description}
                components={{
                  code: ({ children = [], className, ...props }) => {
                    if (
                      typeof children === "string" &&
                      /^\$\$(.*)\$\$/.test(children)
                    ) {
                      const html = katex.renderToString(
                        children.replace(/^\$\$(.*)\$\$/, "$1"),
                        {
                          throwOnError: false,
                        }
                      );
                      return (
                        <code
                          dangerouslySetInnerHTML={{ __html: html }}
                          style={{ background: "transparent" }}
                        />
                      );
                    }
                    const code =
                      props.node && props.node.children
                        ? getCodeString(props.node.children)
                        : children;
                    if (
                      typeof code === "string" &&
                      typeof className === "string" &&
                      /^language-katex/.test(className.toLocaleLowerCase())
                    ) {
                      const html = katex.renderToString(code, {
                        throwOnError: false,
                      });
                      return (
                        <code
                          style={{ fontSize: "150%" }}
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      );
                    }
                    return (
                      <code className={String(className)}>{children}</code>
                    );
                  },
                }}
              />
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
                  height={editorHeight - 48}
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
