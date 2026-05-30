import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import AlbumSection from "../components/AlbumSection";

import { getSongsGroupedByAlbum } from "../api/songService";
import { createBet } from "../api/betService";
import { useAuth } from "../contexts/useAuth";

import type { AlbumWithSongs } from "../types/song";

export default function Bet() {
  const { isAuthenticated } = useAuth();

  const [albums, setAlbums] = useState<AlbumWithSongs[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    async function loadSongs() {
      try {
        const data = await getSongsGroupedByAlbum();
        setAlbums(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao carregar músicas.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadSongs();
  }, []);

  function handleSelect(songId: number) {
    const alreadySelected = selectedSongs.includes(songId);

    if (alreadySelected) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
      return;
    }

    if (selectedSongs.length >= 6) {
      toast.error("Você já selecionou 6 músicas.");
      return;
    }

    setSelectedSongs([...selectedSongs, songId]);
  }

  async function handleSubmitBet() {
    setShowLoginMessage(false);

    if (!isAuthenticated) {
      setShowLoginMessage(true);
      toast.error("Faça login para apostar.");
      return;
    }

    if (selectedSongs.length !== 6) {
      toast.error("Você deve selecionar 6 músicas.");
      return;
    }

    try {
      await createBet({
        songIds: selectedSongs,
      });

      toast.success("Aposta enviada com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao enviar aposta.");
      }
    }
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>🎯 Make Your Bet</h1>

        <p style={styles.subtitle}>
          Selecione 6 músicas que você acha que serão tocadas no próximo show.
        </p>

        <div style={styles.counter}>
          Selecionadas: {selectedSongs.length} / 6
        </div>

        {showLoginMessage && (
          <div style={styles.loginWarning}>
            <p>Faça login para apostar.</p>

            <Link style={styles.loginButton} to="/login">
              Ir para login
            </Link>
          </div>
        )}

        {isLoading && <p>Carregando músicas...</p>}

        {error && <p style={styles.error}>{error}</p>}

        {!isLoading && !error && (
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
        )}

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
    marginBottom: "24px",
    fontWeight: "bold",
  },

  loginWarning: {
    textAlign: "center" as const,
    marginBottom: "24px",
    color: "#ef4444",
    fontWeight: "bold",
  },

  loginButton: {
    display: "inline-block",
    marginTop: "8px",
    padding: "8px 16px",
    backgroundColor: "#ec4899",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
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

  error: {
    color: "red",
    textAlign: "center" as const,
  },
};
