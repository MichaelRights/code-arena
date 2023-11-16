import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Arena",
  description:
    "Code Arena is a coding tournament platform. It is developed for organizing large and small tournaments",
};
export default function Tournament(props: any) {
  return <div>{JSON.stringify(props)}</div>;
}
