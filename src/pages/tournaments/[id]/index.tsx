import React from "react";
import type { GetServerSidePropsResult, NextPageContext } from "next";
import { PlayerLayout } from "@/layouts";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import { getTournamentById } from "@/services/tournamentService";
import { Tournament } from "@/models/tournaments";

export default function TournamentPage(props: Tournament) {
  const router = useRouter();

  return (
    <PlayerLayout>
      <Button
        variant="contained"
        onClick={() => router.push(`/tournaments/${props.id}/arena`)}
      >
        <Typography>{props.name}</Typography>
      </Button>
    </PlayerLayout>
  );
}

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<Tournament>> {
  if (!context.query.id) {
    return { notFound: true };
  }

  const id: number = +context.query["id"];
  const tournament = await getTournamentById(id);

  if (!tournament) return { notFound: true };

  return { props: tournament };
}
