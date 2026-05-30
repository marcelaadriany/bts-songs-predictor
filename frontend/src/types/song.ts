export type Song = {
  id: number;
  title: string;
  alreadyPlayed: boolean;
};

export type AlbumWithSongs = {
  id: number;
  name: string;
  displayOrder: number;
  songs: Song[];
};
