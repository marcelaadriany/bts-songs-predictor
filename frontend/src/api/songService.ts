import { apiFetch } from "./api";
import type { AlbumWithSongs } from "../types/song";

export async function getSongsGroupedByAlbum(): Promise<AlbumWithSongs[]> {
  return apiFetch<AlbumWithSongs[]>("/songs/grouped-by-album");
}
