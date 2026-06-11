export type Concert = {
  id: number;
  name: string;
  concertDate: string;
  concertTime: string;
  timezone: string;
  startsAtUtc: string | null;
  resultReleased: boolean;
};

export type ConcertResult = {
  songId: number;
  songTitle: string;
};
