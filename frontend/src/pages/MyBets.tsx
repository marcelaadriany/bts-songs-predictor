import { useState } from "react";

import Layout from "../components/Layout";
import MyBetCard from "../components/MyBetCard";

import styles from "./MyBets.module.css";

type Song = {
  id: number;
  title: string;
};

type MyBet = {
  concertId: number;
  concertName: string;
  concertDate: string;
  resultReleased: boolean;
  selectedSongs: Song[];
};

const mockBets: MyBet[] = [
  {
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
    concertId: 22,
    concertName: "Busan, dia 2",
    concertDate: "2026-06-13",
    resultReleased: false,
    selectedSongs: [],
  },
];

export default function MyBets() {
  const [bets] = useState<MyBet[]>(mockBets);
  const [expandedConcertId, setExpandedConcertId] = useState<number | null>(
    null,
  );

  function handleToggleExpand(concertId: number) {
    setExpandedConcertId((currentConcertId) =>
      currentConcertId === concertId ? null : concertId,
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

        {expandedConcertId && (
          <section className={styles.editor}>
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setExpandedConcertId(null)}
            >
              ×
            </button>

            <h2>
              Escolha 6 músicas para{" "}
              {
                bets.find((bet) => bet.concertId === expandedConcertId)
                  ?.concertName
              }
            </h2>

            <p>Selecione exatamente 6 músicas da lista abaixo.</p>
          </section>
        )}
      </main>
    </Layout>
  );
}
