import { getOrganizerTournaments } from "@/services/tournamentService";
import { useQuery } from "react-query";

export function useOrganizerTournaments() {
  return useQuery({
    queryKey: ["organizer", "tournaments"],
    queryFn: getOrganizerTournaments,
  });
}
