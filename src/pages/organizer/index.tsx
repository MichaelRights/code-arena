import { useOrganizerTournaments } from "@/hooks/tournaments";
import { OrganizerLayout } from "@/layouts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function Organizer() {
  const router = useRouter();
  const { data: tournaments, isLoading } = useOrganizerTournaments();

  return (
    <OrganizerLayout>
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
                    onClick={() =>
                      router.push(`/organizer/tournaments/${t.id}`)
                    }
                    key={t.id}
                  >
                    <TableCell color="secondary">{t.id}</TableCell>
                    <TableCell>{t.name}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OrganizerLayout>
  );
}
