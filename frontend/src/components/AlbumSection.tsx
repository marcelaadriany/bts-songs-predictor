import type { AlbumWithSongs } from "../types/song";
import SongCheckbox from "./SongCheckbox";

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
    <div style={styles.container}>
      <h3 style={styles.title}>{album.name}</h3>

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
  );
}

const styles = {
  container: {
    marginBottom: "24px",
  },

  title: {
    backgroundColor: "#ec4899",
    color: "white",
    padding: "4px 8px",
    display: "inline-block",
    marginBottom: "12px",
    fontSize: "14px",
  },
};
