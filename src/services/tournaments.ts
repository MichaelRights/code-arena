import { Tournament } from "@/models/tournaments";

export function getTournaments() {
  return new Promise<Tournament[]>((resolve) => {
    resolve([
      { id: 1, name: "Code Arena Tournament 1" },
      { id: 2, name: "Code Arena Tournament 2" },
    ]);
  });
}
