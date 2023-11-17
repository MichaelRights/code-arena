import React from "react";
import type { Metadata, NextPageContext } from "next";
import { PlayerLayout } from "@/layouts";
import { useParams, useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Code Arena",
  description:
    "Code Arena is a coding tournament platform. It is developed for organizing large and small tournaments",
};

export default function Tournament(props: any) {
  const params = useParams();
  const router = useRouter();
  return (
    <PlayerLayout>
      <Button
        variant="contained"
        onClick={() => router.push(`/tournaments/${props.id}/arena`)}
      >
        <Typography>{params.id}</Typography>
      </Button>
    </PlayerLayout>
  );
}

export function getServerSideProps(context: NextPageContext) {
  return { props: context.query };
}
