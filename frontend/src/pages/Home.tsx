import { useNavigate } from "react-router-dom";
import type { Song } from "../types/Song";

export default function Home() {
  const navigate = useNavigate();

  const songs: Song[] = [
    { id: 1, name: "Dynamite", played: true },
    { id: 2, name: "Butter", played: true },
    { id: 3, name: "Spring Day", played: false },
    { id: 4, name: "Blood Sweat & Tears", played: false },
    { id: 5, name: "Fake Love", played: false },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎤 BTS Guessing Game</h1>

      <p style={styles.subtitle}>Guess the next surprise songs from the tour</p>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>

        <button style={styles.buttonPrimary} onClick={() => navigate("/bet")}>
          Make a Bet
        </button>

        <button style={styles.button} onClick={() => navigate("/results")}>
          Results
        </button>
      </div>

      <h2 style={styles.sectionTitle}>🎵 Songs List</h2>

      <div style={styles.list}>
        {songs.map((song) => (
          <div
            key={song.id}
            style={{
              ...styles.card,
              backgroundColor: song.played ? "#d3d3d3" : "#ffffff",
              opacity: song.played ? 0.6 : 1,
            }}
          >
            <span>{song.name}</span>
            <span style={styles.status}>
              {song.played ? "✔ Played" : "⏳ Not played"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "5px",
  },
  subtitle: {
    textAlign: "center" as const,
    marginBottom: "20px",
    color: "#666",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 15px",
    cursor: "pointer",
  },
  buttonPrimary: {
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
  },
  sectionTitle: {
    marginBottom: "10px",
  },
  list: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  status: {
    fontSize: "12px",
    color: "#555",
  },
};
