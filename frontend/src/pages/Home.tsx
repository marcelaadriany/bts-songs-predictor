import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import ConcertCard from "../components/ConcertCard";

import {
  getConcerts,
  getNextConcert,
  getConcertResults,
} from "../api/concertService";

import type { Concert, ConcertResult } from "../types/concert";

import styles from "./Home.module.css";

export default function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [nextConcert, setNextConcert] = useState<Concert | null>(null);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [concertResults, setConcertResults] = useState<ConcertResult[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [concertsData, nextConcertData] = await Promise.all([
          getConcerts(),
          getNextConcert(),
        ]);

        setConcerts(concertsData);
        setNextConcert(nextConcertData);
        setSelectedConcert(nextConcertData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Erro ao carregar shows.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadHomeData();
  }, []);

  useEffect(() => {
    async function loadConcertResults() {
      if (!selectedConcert) return;

      try {
        setIsLoadingResults(true);

        const results = await getConcertResults(selectedConcert.id);
        setConcertResults(results);
      } catch {
        setConcertResults([]);
      } finally {
        setIsLoadingResults(false);
      }
    }

    loadConcertResults();
  }, [selectedConcert]);

  function formatFullDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  return (
    <Layout>
      <main className={styles.page}>
        <section className={styles.hero}>
          <img
            src="/images/arirang-tour-logo.jpg"
            alt="BTS World Tour Arirang"
            className={styles.heroImage}
          />
        </section>

        <section className={styles.sectionHeader}>
          <span className={styles.line}></span>
          <h2>Shows da turnê</h2>
        </section>

        {isLoading && <p className={styles.status}>Carregando shows...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && (
          <>
            <section className={styles.cards}>
              {concerts.map((concert) => (
                <ConcertCard
                  key={concert.id}
                  concert={concert}
                  isSelected={selectedConcert?.id === concert.id}
                  isNextConcert={nextConcert?.id === concert.id}
                  onSelect={setSelectedConcert}
                />
              ))}
            </section>

            {selectedConcert && (
              <section className={styles.details}>
                <div className={styles.detailsInfo}>
                  <span className={styles.detailsLabel}>Selected show</span>

                  <h2>{selectedConcert.name}</h2>

                  <p>{formatFullDate(selectedConcert.concertDate)}</p>
                </div>

                <div className={styles.surpriseSongs}>
                  <h3>Surprise Songs</h3>

                  {isLoadingResults && <p>Carregando resultados...</p>}

                  {!isLoadingResults && concertResults.length > 0 && (
                    <ul className={styles.resultList}>
                      {concertResults.map((result) => (
                        <li key={result.songId}>{result.songTitle}</li>
                      ))}
                    </ul>
                  )}

                  {!isLoadingResults && concertResults.length === 0 && (
                    <p>Aguardando resultado do show.</p>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}
