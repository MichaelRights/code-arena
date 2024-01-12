import { useLayoutSize } from "@/hooks/common";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
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
import React from "react";

interface TaskDescriptionProps {
  description: string;
  title: string;
  solved: boolean;
}

export function TaskDescription({
  description,
  solved,
  title,
}: TaskDescriptionProps) {
  const layoutSize = useLayoutSize({ heightDifference: 70 });

  return (
    <Box px={2.5} py={2} overflow="auto" height={layoutSize.height - 48}>
      <Box
        pb={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">{title}</Typography>
        {solved && (
          <Typography color="green" variant="body1">
            Solved
          </Typography>
        )}
      </Box>
      <Markdown
        style={{ background: "transparent" }}
        source={description}
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
              return <code dangerouslySetInnerHTML={{ __html: html }} />;
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
              <code className={!className ? "" : String(className)}>
                {children}
              </code>
            );
          },
        }}
      />
    </Box>
  );
}
