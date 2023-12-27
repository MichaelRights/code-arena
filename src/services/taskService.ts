import { TASKS } from "@/data";
import { Task } from "@/models/tasks";

export function getTasksByTournamentId(tournamentId: string) {
  return new Promise<Task[]>((resolve) => {
    resolve(TASKS);
  });
}
