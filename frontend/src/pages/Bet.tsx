import { useState } from "react";

import SongOption from "../components/SongCheckbox";
import type { Song } from "../types/Song";

export default function Bet() {
  const songs: Song[] = [
    { id: 1, name: "Dynamite", played: true },
    { id: 2, name: "Butter", played: true },
    { id: 3, name: "Spring Day", played: false },
    { id: 4, name: "Fake Love", played: false },
    { id: 5, name: "Black Swan", played: false },
    { id: 6, name: "Run BTS", played: false },
  ];

  const availableSongs = songs.filter((song) => !song.played);

  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);

  function handleSelect(songId: number) {
    const alreadySelected = selectedSongs.includes(songId);

    // remove seleção
    if (alreadySelected) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
      return;
    }

    // impede mais de 2
    if (selectedSongs.length >= 2) {
      alert("You can only select 2 songs");
      return;
    }

    // adiciona seleção
    setSelectedSongs([...selectedSongs, songId]);
  }

  function handleSubmitBet() {
    if (selectedSongs.length !== 2) {
      alert("Select exactly 2 songs");
      return;
    }

    console.log("Bet submitted:", selectedSongs);

    alert("Bet submitted successfully!");
  }

  return (
    <div style={styles.container}>
      <h1>🎯 Make Your Bet</h1>

      <p>Select 2 songs you think will be played next.</p>

      <div style={styles.list}>
        {availableSongs.map((song) => (
          <SongOption
            key={song.id}
            song={song}
            selected={selectedSongs.includes(song.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div style={styles.footer}>
        <p>Selected: {selectedSongs.length} / 2</p>

        <button style={styles.button} onClick={handleSubmitBet}>
          Submit Bet
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  list: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginTop: "20px",
  },

  footer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    padding: "10px 16px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
