import type { Song } from "../types/Song";

type Props = {
  song: Song;
  clickable?: boolean;
  selected?: boolean;
  onSelect?: (id: number) => void;
};

export default function SongCheckbox({
  song,
  clickable = false,
  selected = false,
  onSelect,
}: Props) {
  return (
    <div
      onClick={() => {
        if (clickable && !song.played && onSelect) {
          onSelect(song.id);
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: clickable && !song.played ? "pointer" : "default",
        opacity: song.played ? 0.5 : 1,
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          width: "18px",
          height: "18px",
          border: "2px solid black",
          transition: "0.3s",
          backgroundColor: selected ? "#ec4899" : "transparent",
        }}
      />

      <span
        style={{
          textDecoration: song.played ? "line-through" : "none",
        }}
      >
        {song.name}
      </span>
    </div>
  );
}
