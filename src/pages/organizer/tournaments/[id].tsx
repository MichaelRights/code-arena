import React from "react";
import type { NextPageContext } from "next";
import { PlayerLayout } from "@/layouts";
import { useParams, useRouter } from "next/navigation";
import { Typography } from "@mui/material";

export default function Tournament(props: any) {
  const params = useParams();
  const router = useRouter();
  return (
    <PlayerLayout>
      <Typography>{params.id}</Typography>
    </PlayerLayout>
  );
}

export function getServerSideProps(context: NextPageContext) {
  return { props: context.query };
}
