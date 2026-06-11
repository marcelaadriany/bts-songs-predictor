import { apiFetch } from "./api";

type BetRequest = {
  songIds: number[];
};

export type BetSong = {
  id: number;
  title: string;
  alreadyPlayed: boolean;
};

export type MyBetResponse = {
  id: number;
  username: string;
  concertName: string;
  createdAt: string;
  songs: BetSong[];
};

export async function createBet(data: BetRequest) {
  return apiFetch("/bets", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBet(betId: number, data: BetRequest) {
  return apiFetch(`/bets/${betId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getMyBets(): Promise<MyBetResponse[]> {
  return apiFetch<MyBetResponse[]>("/bets/me");
}
