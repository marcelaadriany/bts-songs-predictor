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
export async function updateBet(betId: number, data: BetRequest) {
  return apiFetch(`/bets/${betId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
