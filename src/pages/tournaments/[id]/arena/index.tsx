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
