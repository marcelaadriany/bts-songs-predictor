import type { Song } from "./Song";

export interface Album {
  id: number;
  name: string;
  songs: Song[];
}