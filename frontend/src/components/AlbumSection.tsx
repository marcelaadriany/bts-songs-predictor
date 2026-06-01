import type { AlbumWithSongs } from "../types/song";
import SongCheckbox from "./SongCheckbox";

import styles from "./AlbumSection.module.css";

type Props = {
  album: AlbumWithSongs;
  clickable?: boolean;
  selectedSongs?: number[];
  onSelect?: (id: number) => void;
  showCheckbox?: boolean;
};

export default function AlbumSection({
  album,
  clickable = false,
  selectedSongs = [],
  onSelect,
  showCheckbox = true,
}: Props) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{album.name}</h3>

      <div className={styles.songList}>
        {album.songs.map((song) => (
          <SongCheckbox
            key={song.id}
            song={song}
            clickable={clickable}
            selected={selectedSongs.includes(song.id)}
            onSelect={onSelect}
            showCheckbox={showCheckbox}
          />
        ))}
      </div>
    </section>
  );
}
