import { getTournaments } from "@/services/tournaments";
import { useQuery } from "react-query";

export function useTournaments() {
  return useQuery({ queryKey: ["tournaments"], queryFn: getTournaments });
}
