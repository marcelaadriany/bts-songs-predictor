import { apiFetch } from "./api";

type BetRequest = {
  songIds: number[];
};

export async function createBet(data: BetRequest) {
  return apiFetch("/bets", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
