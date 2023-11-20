import { getTournaments } from "@/services/tournamentService";
import { useQuery } from "react-query";

export function useTournaments() {
  return useQuery({ queryKey: ["tournaments"], queryFn: getTournaments });
}
