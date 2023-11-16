import React from "react";
import type { Metadata, NextPageContext } from "next";
import { PlayerLayout } from "@/layouts";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Code Arena",
  description:
    "Code Arena is a coding tournament platform. It is developed for organizing large and small tournaments",
};

export default function Tournament(props: any) {
  console.log(props);

  const params = useParams();
  return (
    <PlayerLayout>
      <div>{JSON.stringify(params)}</div>
    </PlayerLayout>
  );
}

export function getServerSideProps(context: NextPageContext) {
  return { props: context.query };
}
