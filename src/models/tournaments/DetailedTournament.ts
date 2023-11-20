import { Tournament } from ".";

export interface DetailedTournament extends Tournament {
  numberOfParticipants: number;
}
