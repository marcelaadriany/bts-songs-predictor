import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import AlbumSection from "../components/AlbumSection";

import { getSongsGroupedByAlbum } from "../api/songService";
import { createBet } from "../api/betService";
import { useAuth } from "../contexts/useAuth";

import type { AlbumWithSongs } from "../types/song";

import styles from "./Bet.module.css";

export default function Bet() {
  const { isAuthenticated } = useAuth();

  const [albums, setAlbums] = useState<AlbumWithSongs[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    async function loadSongs() {
      try {
        const data = await getSongsGroupedByAlbum();
        setAlbums(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Erro ao carregar músicas.",
        );
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
      setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <main className={styles.page}>
        <section className={styles.board}>
          <header className={styles.header}>
            <h1 className={styles.title}>Make Your Bet</h1>

            <p className={styles.subtitle}>
              Selecione 6 músicas que você acha que serão tocadas no próximo
              show. As músicas já tocadas também podem ser escolhidas.
            </p>

            <div className={styles.counter}>
              Selecionadas: {selectedSongs.length} / 6
            </div>
          </header>

          {showLoginMessage && (
            <div className={styles.loginWarning}>
              <p>Faça login para apostar.</p>

              <Link className={styles.loginButton} to="/login">
                Ir para login
              </Link>
            </div>
          )}

          {isLoading && <p className={styles.status}>Carregando músicas...</p>}

          {error && <p className={styles.error}>{error}</p>}

          {!isLoading && !error && (
            <div className={styles.grid}>
              {albums.map((album) => (
                <AlbumSection
                  key={album.id}
                  album={album}
                  clickable
                  selectedSongs={selectedSongs}
                  onSelect={handleSelect}
                  showCheckbox
                />
              ))}
            </div>
          )}

          <div className={styles.footer}>
            <button
              className={styles.button}
              onClick={handleSubmitBet}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Enviar"}
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
