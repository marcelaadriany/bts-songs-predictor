import type { Song } from "../types/song";

import styles from "./SongCheckbox.module.css";

type Props = {
  song: Song;
  clickable?: boolean;
  selected?: boolean;
  onSelect?: (id: number) => void;
  showCheckbox?: boolean;
};

export default function SongCheckbox({
  song,
  clickable = false,
  selected = false,
  onSelect,
  showCheckbox = true,
}: Props) {
  return (
    <div
      onClick={() => {
        if (clickable && onSelect) {
          onSelect(song.id);
        }
      }}
      className={`${styles.row} ${clickable ? styles.clickable : ""}`}
    >
      {showCheckbox && (
        <div
          className={`${styles.checkbox} ${selected ? styles.selected : ""}`}
        />
      )}

      <span
        className={`${styles.title} ${song.alreadyPlayed ? styles.played : ""}`}
      >
        {song.title}
      </span>
    </div>
  );
}
