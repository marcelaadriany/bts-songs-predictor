import type { Song } from "../types/Song";

type Props = {
  song: Song;
  selected: boolean;
  onSelect: (id: number) => void;
};

export default function SongOption({ song, selected, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(song.id)}
      style={{
        padding: "12px",
        borderRadius: "8px",
        border: selected ? "2px solid #4f46e5" : "1px solid #ccc",
        backgroundColor: selected ? "#ede9fe" : "#fff",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      {song.name}
    </div>
  );
}
