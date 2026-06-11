import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import MyBetCard from "../components/MyBetCard";
import BetForm from "../components/BetForm";

import { getSongsGroupedByAlbum } from "../api/songService";
import { updateBet } from "../api/betService";

import type { AlbumWithSongs } from "../types/song";

import styles from "./MyBets.module.css";

type Song = {
  id: number;
  title: string;
};

type MyBet = {
  betId: number;
  concertId: number;
  concertName: string;
  concertDate: string;
  resultReleased: boolean;
  selectedSongs: Song[];
};

const mockBets: MyBet[] = [
  {
    betId: 1,
    concertId: 21,
    concertName: "Busan, dia 1",
    concertDate: "2026-06-12",
    resultReleased: false,
    selectedSongs: [
      { id: 1, title: "Spring Day" },
      { id: 2, title: "Mikrokosmos" },
      { id: 3, title: "Dionysus" },
      { id: 4, title: "Boy With Luv" },
      { id: 5, title: "Outro: Tear" },
      { id: 6, title: "For Youth" },
    ],
  },
  {
    betId: 2,
    concertId: 22,
    concertName: "Busan, dia 2",
    concertDate: "2026-06-13",
    resultReleased: false,
    selectedSongs: [],
  },
];

export default function MyBets() {
  const [bets] = useState<MyBet[]>(mockBets);
  const [albums, setAlbums] = useState<AlbumWithSongs[]>([]);
  const [expandedConcertId, setExpandedConcertId] = useState<number | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expandedBet = bets.find((bet) => bet.concertId === expandedConcertId);

  useEffect(() => {
    async function loadSongs() {
      try {
        const albumsData = await getSongsGroupedByAlbum();
        setAlbums(albumsData);
      } catch {
        toast.error("Erro ao carregar músicas.");
      }
    }

    loadSongs();
  }, []);

  function handleToggleExpand(concertId: number) {
    setExpandedConcertId((currentConcertId) =>
      currentConcertId === concertId ? null : concertId,
    );
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
      setExpandedConcertId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar aposta.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <main className={styles.page}>
        <header className={styles.header}>
          <h1>Minhas Apostas</h1>

          <h2>Próximos shows</h2>

          <p>Você pode alterar suas apostas enquanto o show não acontecer.</p>
        </header>

        <section className={styles.cards}>
          {bets.map((bet) => (
            <MyBetCard
              key={bet.concertId}
              bet={bet}
              isExpanded={expandedConcertId === bet.concertId}
              onToggle={() => handleToggleExpand(bet.concertId)}
            />
          ))}
        </section>

        {expandedBet && (
          <section className={styles.editor}>
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setExpandedConcertId(null)}
            >
              ×
            </button>

            <h2>Editar músicas para {expandedBet.concertName}</h2>

            <p>Selecione exatamente 6 músicas da lista abaixo.</p>

            {albums.length > 0 && (
              <BetForm
                albums={albums}
                initialSelectedSongs={expandedBet.selectedSongs.map(
                  (song) => song.id,
                )}
                submitLabel="Salvar alterações"
                isSubmitting={isSubmitting}
                onSubmit={(songIds) =>
                  handleUpdateBet(expandedBet.betId, songIds)
                }
              />
            )}
          </section>
        )}
      </main>
    </Layout>
  );
}
