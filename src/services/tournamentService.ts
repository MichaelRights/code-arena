import { TESTCASES } from "@/data";
import { TestCase } from "@/models/tasks";
import { DetailedTournament, Tournament } from "@/models/tournaments";

export function getTournaments() {
  return new Promise<Tournament[]>((resolve) => {
    resolve([
      { id: 1, name: "Code Arena Tournament 1" },
      { id: 2, name: "Code Arena Tournament 2" },
    ]);
  });
}

export function getOrganizerTournaments() {
  return new Promise<DetailedTournament[]>((resolve) => {
    resolve([
      { id: 1, name: "Code Arena Tournament 1", numberOfParticipants: 3 },
      { id: 2, name: "Code Arena Tournament 2", numberOfParticipants: 4 },
    ]);
  });
}

export async function getTournamentById(id: number) {
  return (await getTournaments()).find((t) => t.id === id);
}

export async function getTestCases(taskId: number) {
  return new Promise<TestCase[]>((resolve) => {
    resolve(TESTCASES);
  });
}
