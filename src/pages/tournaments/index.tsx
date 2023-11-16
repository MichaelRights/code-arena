import { useTournaments } from "@/hooks/tournaments";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { PlayerLayout } from "@/layouts";

export default function Tournaments() {
  const { data: tournaments, isLoading } = useTournaments();
  const router = useRouter();

  return (
    <PlayerLayout>
      <div>
        <Typography>Tournaments</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || !tournaments
                ? ""
                : tournaments.map((t) => (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      onClick={() => router.push(`/tournaments/${t.id}`)}
                      key={t.id}
                    >
                      <TableCell color="secondary">{t.id}</TableCell>
                      <TableCell>{t.name}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </PlayerLayout>
  );
}
