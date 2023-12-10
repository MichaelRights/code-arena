import { getTestCases } from "@/services/tournamentService";
import { useQuery } from "react-query";

export function useTestCases(taskId: number) {
  return useQuery({
    queryKey: ["tournaments", taskId],
    queryFn: () => getTestCases(taskId),
  });
}
