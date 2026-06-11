import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import BetForm from "../components/BetForm";

import { getSongsGroupedByAlbum } from "../api/songService";
import { createBet } from "../api/betService";
import { getNextConcert } from "../api/concertService";
import { useAuth } from "../contexts/useAuth";

import type { AlbumWithSongs } from "../types/song";
import type { Concert } from "../types/concert";

import styles from "./Bet.module.css";

export default function Bet() {
  const { isAuthenticated } = useAuth();

  const [albums, setAlbums] = useState<AlbumWithSongs[]>([]);
  const [nextConcert, setNextConcert] = useState<Concert | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [albumsData, nextConcertData] = await Promise.all([
          getSongsGroupedByAlbum(),
          getNextConcert(),
        ]);

        setAlbums(albumsData);
        setNextConcert(nextConcertData);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Erro ao carregar dados da aposta.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  async function handleCreateBet(songIds: number[]) {
    if (!isAuthenticated) {
      toast.error("Faça login para apostar.");
      return;
    }

    if (songIds.length !== 6) {
      toast.error("Você deve selecionar 6 músicas.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createBet({ songIds });

      toast.success("Aposta enviada com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao enviar aposta.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <main className={styles.page}>
        <Link to="/" className={styles.backLink}>
          ← Voltar
        </Link>

        <section className={styles.hero}>
          <div>
            <span className={styles.label}>Próximo show</span>

            <h1>{nextConcert?.name ?? "Próximo show"}</h1>

            {nextConcert && (
              <p className={styles.date}>
                {formatDate(nextConcert.concertDate)}
              </p>
            )}
          </div>

          <div className={styles.countdownBox}>
            <span>Faltam</span>

            <div className={styles.countdownNumbers}>
              <strong>06</strong>
              <strong>23</strong>
              <strong>48</strong>
              <strong>19</strong>
            </div>

            <div className={styles.countdownLabels}>
              <span>Dias</span>
              <span>Horas</span>
              <span>Min</span>
              <span>Seg</span>
            </div>
          </div>
        </section>

        <section className={styles.intro}>
          <h2>Quais serão as 2 músicas surpresas desse show?</h2>

          <p>Selecione 6 opções dentre as músicas abaixo.</p>
          <p>
            Músicas já tocadas em shows passados (em negrito) também podem ser
            selecionadas.
          </p>
        </section>

        {isLoading && <p className={styles.status}>Carregando músicas...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && (
          <BetForm
            albums={albums}
            submitLabel="Enviar aposta"
            isSubmitting={isSubmitting}
            onSubmit={handleCreateBet}
          />
        )}
      </main>
    </Layout>
  );
}
