import { getTournamentById } from "@/services/tournamentService";
import { useQuery } from "react-query";

export function useTournament(id: number) {
  return useQuery({
    queryKey: ["tournaments", id],
    queryFn: () => getTournamentById(id),
  });
}
