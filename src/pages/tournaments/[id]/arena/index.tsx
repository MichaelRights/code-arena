"use client";
import { PlayerLayout } from "@/layouts";
import { NextPageContext } from "next";
import React from "react";
import dynamic from "next/dynamic";

import { Box, Divider, Typography } from "@mui/material";
import { useLayoutSize } from "@/hooks/common";
import { useState } from "react";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function Arena(props: any) {
  const layoutSize = useLayoutSize({ heightDifference: 60 });
  const [taskWidthChange, setTaskWidth] = useState(0);
  return (
    <PlayerLayout>
      <Box display="flex" flexDirection="row">
        <Box
          height={layoutSize.height}
          width={layoutSize.width / 2 + taskWidthChange}
        >
          <Typography variant="h1">Task</Typography>
        </Box>
        {/* <Divider /> */}
        <Box width={layoutSize.width / 2} display="flex" flexWrap="wrap">
          <Box width={layoutSize.width / 2} height={layoutSize.height / 2}>
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
          </Box>
          <Box height={layoutSize.height / 2}>
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
