import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import MyBetCard from "../components/MyBetCard";
import BetForm from "../components/BetForm";

import { getSongsGroupedByAlbum } from "../api/songService";
import { getMyBets, updateBet } from "../api/betService";

import type { AlbumWithSongs } from "../types/song";
import type { MyBetResponse } from "../api/betService";

import styles from "./MyBets.module.css";

export default function MyBets() {
  const [bets, setBets] = useState<MyBetResponse[]>([]);
  const [albums, setAlbums] = useState<AlbumWithSongs[]>([]);

  const [expandedBetId, setExpandedBetId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expandedBet = bets.find((bet) => bet.id === expandedBetId);

  useEffect(() => {
    async function loadData() {
      try {
        const [betsData, albumsData] = await Promise.all([
          getMyBets(),
          getSongsGroupedByAlbum(),
        ]);

        setBets(betsData);
        setAlbums(albumsData);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao carregar suas apostas.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  function handleToggleExpand(betId: number) {
    setExpandedBetId((currentBetId) => (currentBetId === betId ? null : betId));
  }

  async function handleUpdateBet(betId: number, songIds: number[]) {
    if (songIds.length !== 6) {
      toast.error("Você deve selecionar 6 músicas.");
      return;
    }

    try {
      setIsSubmitting(true);

      await updateBet(betId, { songIds });

      toast.success("Aposta atualizada com sucesso!");

      setBets((currentBets) =>
        currentBets.map((bet) =>
          bet.id === betId
            ? {
                ...bet,
                songs: bet.songs.map((song) =>
                  songIds.includes(song.id) ? song : song,
                ),
              }
            : bet,
        ),
      );

      setExpandedBetId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar aposta.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <main className={styles.page}>
          <p>Carregando suas apostas...</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className={styles.page}>
        <header className={styles.header}>
          <h1>Minhas Apostas</h1>

          <h2>Próximos shows</h2>

          <p>Você pode alterar suas apostas enquanto o show não acontecer.</p>
        </header>

        {bets.length === 0 ? (
          <p>Você ainda não fez nenhuma aposta.</p>
        ) : (
          <section className={styles.cards}>
            {bets.map((bet) => (
              <MyBetCard
                key={bet.id}
                bet={{
                  concertId: bet.id,
                  concertName: bet.concertName,
                  concertDate: bet.createdAt,
                  resultReleased: false,
                  selectedSongs: bet.songs,
                }}
                isExpanded={expandedBetId === bet.id}
                onToggle={() => handleToggleExpand(bet.id)}
              />
            ))}
          </section>
        )}

        {expandedBet && (
          <section className={styles.editor}>
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setExpandedBetId(null)}
            >
              ×
            </button>

            <h2>Editar músicas para {expandedBet.concertName}</h2>

            <p>Selecione exatamente 6 músicas da lista abaixo.</p>

            {albums.length > 0 && (
              <BetForm
                albums={albums}
                initialSelectedSongs={expandedBet.songs.map((song) => song.id)}
                submitLabel="Salvar alterações"
                isSubmitting={isSubmitting}
                onSubmit={(songIds) => handleUpdateBet(expandedBet.id, songIds)}
              />
            )}
          </section>
        )}
      </main>
    </Layout>
  );
}
