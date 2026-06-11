import { apiFetch } from "./api";
import type { Concert, ConcertResult } from "../types/concert";

export async function getConcerts(): Promise<Concert[]> {
  return apiFetch<Concert[]>("/concerts");
}

export async function getNextConcert(): Promise<Concert> {
  return apiFetch<Concert>("/concerts/next");
}

export async function getConcertResults(
  concertId: number,
): Promise<ConcertResult[]> {
  return apiFetch<ConcertResult[]>(`/concerts/${concertId}/results`);
}

export async function getConcertById(concertId: number): Promise<Concert> {
  return apiFetch<Concert>(`/concerts/${concertId}`);
}
