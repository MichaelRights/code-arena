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
} from "@/components/ui";
import { TestCases } from "@/components/arena";
import { useTestCases } from "@/hooks/tournaments";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function Arena(props: any) {
  const layoutSize = useLayoutSize({ heightDifference: 70 });
  const [descriptionMaximzed, setDescriptionMaximized] = useState(false);
  const [editorMaximzed, setEditorMaximized] = useState(false);
  const [testCasesMaximzed, setTestCasesMaximized] = useState(false);
  const {
    splitterPosition: verticalSplitterPosition,
    setSplitterPosition: setVerticalSplitterPosition,
    handleDragStart: handleVerticalSplitterDragStart,
  } = useSplitter({
    orientation: "vertical",
  });

  const {
    splitterPosition: horizontalSplitterPosition,
    setSplitterPosition: setHorizontalSplitterPosition,
    handleDragStart: handleHorizontalSplitterDragStart,
  } = useSplitter({
    orientation: "horizontal",
  });

  const { data: testCases } = useTestCases(props.id);

  const toggleDescriptionSize = useCallback(() => {
    setDescriptionMaximized((prev) => !prev);
  }, [descriptionMaximzed, layoutSize]);

  const toggleEditorSize = useCallback(() => {
    setEditorMaximized((prev) => !prev);
  }, [editorMaximzed, layoutSize]);

  const toggleTestCasesSize = useCallback(() => {
    setTestCasesMaximized((prev) => !prev);
  }, [testCasesMaximzed, layoutSize]);

  return (
    <PlayerLayout
      headerChildren={
        <Box display="flex" alignItems="center" height={32} gap={1}>
          <Button variant="outlined">Run</Button>
          <Button color="success" variant="contained">
            Submit
          </Button>
        </Box>
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
            <Box p={2}>
              <Box
                pb={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Task</Typography>
                <Typography color="green" variant="body1">
                  Solved
                </Typography>
              </Box>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium nihil, debitis quidem omnis suscipit rerum mollitia
                similique rem et incidunt enim iure labore quibusdam? Nostrum
                enim voluptatem consequatur pariatur ducimus.
              </Typography>
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
                    quickSuggestions: {
                      other: false,
                      comments: false,
                      strings: false,
                    },
                    parameterHints: {
                      enabled: false,
                    },
                    suggestOnTriggerCharacters: false,
                    acceptSuggestionOnEnter: "off",
                    tabCompletion: "off",
                    wordBasedSuggestions: false,
                    minimap: {
                      enabled: false,
                    },
                  }}
                  defaultLanguage="javascript"
                  defaultValue={`// ${props.id}`}
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
              <FlexibleBox
                zIndex={2}
                height={
                  testCasesMaximzed
                    ? layoutSize.height
                    : layoutSize.height / 2 - horizontalSplitterPosition - 4
                }
                width="100%"
              >
                <Tabbar>
                  <ScreenSizeButton
                    maximized={testCasesMaximzed}
                    onClick={toggleTestCasesSize}
                  />
                  <TabButton selected={true}>Testcase</TabButton>
                </Tabbar>
                {!!testCases && <TestCases data={testCases} />}
              </FlexibleBox>
            )}
          </Box>
        )}
      </Box>
    </PlayerLayout>
  );
}

export function getServerSideProps(context: NextPageContext) {
  const id = context.query.id;
  return { props: context.query };
}
