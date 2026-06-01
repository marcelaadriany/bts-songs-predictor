import type { Song } from "../types/song";

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
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: clickable ? "pointer" : "default",
        opacity: song.alreadyPlayed ? 0.5 : 1,
        marginBottom: "8px",
      }}
    >
      {showCheckbox && (
        <div
          style={{
            width: "18px",
            height: "18px",
            border: "2px solid white",
            backgroundColor: selected ? "#ec4899" : "transparent",
          }}
        />
      )}

      <span
        style={{
          color: song.alreadyPlayed ? "#ec4899" : "white",
          textDecoration: song.alreadyPlayed ? "line-through" : "none",
          fontWeight: 600,
        }}
      >
        {song.title}
      </span>
    </div>
  );
}
