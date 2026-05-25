import { useState } from "react";

import Layout from "../components/Layout";
import AlbumSection from "../components/AlbumSection";

import { albums } from "../data/songs";
import toast from "react-hot-toast";

export default function Bet() {
  const [selectedSongs, setSelectedSongs] = useState<number[]>(() => {
    const savedBet = localStorage.getItem("bet");

    return savedBet ? JSON.parse(savedBet) : [];
  });

  function handleSelect(songId: number) {
    const alreadySelected = selectedSongs.includes(songId);

    // remove seleção
    if (alreadySelected) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));

      return;
    }

    // limita a 2 músicas
    if (selectedSongs.length >= 2) {
      toast.error("You can only select 2 songs");

      return;
    }

    // adiciona seleção
    setSelectedSongs([...selectedSongs, songId]);
  }

  function handleSubmitBet() {
    if (selectedSongs.length !== 2) {
      toast("Select exactly 2 songs");

      return;
    }

    localStorage.setItem("bet", JSON.stringify(selectedSongs));

    console.log(selectedSongs);

    toast.success("Bet submitted!");
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>🎯 Make Your Bet</h1>

        <p style={styles.subtitle}>
          Select 2 songs you think will be played next.
        </p>

        <div style={styles.counter}>Selected: {selectedSongs.length} / 2</div>

        <div style={styles.grid}>
          {albums.map((album) => (
            <AlbumSection
              key={album.id}
              album={album}
              clickable
              selectedSongs={selectedSongs}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <div style={styles.footer}>
          <button style={styles.button} onClick={handleSubmitBet}>
            Submit Bet
          </button>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center" as const,
    marginBottom: "8px",
  },

  subtitle: {
    textAlign: "center" as const,
    color: "#666",
    marginBottom: "24px",
  },

  counter: {
    textAlign: "center" as const,
    marginBottom: "32px",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
  },

  footer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
  },

  button: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ec4899",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
