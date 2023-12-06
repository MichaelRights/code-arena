"use client";
import { PlayerLayout } from "@/layouts";
import { NextPageContext } from "next";
import React from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import {
  useHorizontalSplitter,
  useLayoutSize,
  useVerticalSplitter,
} from "@/hooks/common";
import { HorizontalSplitter, VerticalSplitter } from "@/components";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function Arena(props: any) {
  const layoutSize = useLayoutSize({ heightDifference: 70 });
  const { verticalSplitterPosition } = useVerticalSplitter();
  const { horizontalSplitterPosition } = useHorizontalSplitter();

  return (
    <PlayerLayout>
      <Box display="flex" flexDirection="row">
        <Box
          height={layoutSize.height}
          width={layoutSize.width / 2 + verticalSplitterPosition}
        >
          <Typography variant="h1">Task</Typography>
        </Box>
        <VerticalSplitter height={layoutSize.height} />
        <Box
          width={layoutSize.width / 2 - verticalSplitterPosition}
          display="flex"
          flexWrap="wrap"
        >
          <Box
            width={layoutSize.width / 2 - verticalSplitterPosition}
            height={layoutSize.height / 2 + horizontalSplitterPosition}
          >
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
            <HorizontalSplitter
              width={layoutSize.width / 2 - verticalSplitterPosition}
            />
          </Box>

          <Box height={layoutSize.height / 2 - horizontalSplitterPosition}>
            <Typography variant="h1">Test Case</Typography>
          </Box>
        </Box>
      </Box>
    </PlayerLayout>
  );
}

export function getServerSideProps(context: NextPageContext) {
  return { props: context.query };
}
