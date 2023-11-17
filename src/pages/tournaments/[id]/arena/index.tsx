"use client";
import { PlayerLayout } from "@/layouts";
import { NextPageContext } from "next";
import React from "react";

import dynamic from "next/dynamic";
const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function Arena(props: any) {
  return (
    <PlayerLayout>
      <Editor
        beforeMount={() => {
          // @ts-ignore

          window.MonacoEnvironment = {};
          // @ts-ignore
          window.MonacoEnvironment.getWorkerUrl = (
            _moduleId: string,
            label: string
          ) => {
            if (label === "json") return "_next/static/json.worker.js";
            if (label === "css") return "_next/static/css.worker.js";
            if (label === "html") return "_next/static/html.worker.js";
            if (label === "typescript" || label === "javascript")
              return "_next/static/ts.worker.js";
            return "_next/static/editor.worker.js";
          };
        }}
        height="90vh"
        defaultLanguage="javascript"
        defaultValue={`// ${props.id}`}
        theme="vs-dark"
      />
    </PlayerLayout>
  );
}

export function getServerSideProps(context: NextPageContext) {
  return { props: context.query };
}
