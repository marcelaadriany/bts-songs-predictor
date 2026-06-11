import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import ConcertCard from "../components/ConcertCard";

import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

import {
  getConcerts,
  getNextConcert,
  getConcertResults,
} from "../api/concertService";

import type { Concert, ConcertResult } from "../types/concert";

import styles from "./Home.module.css";
import { Countdown } from "../components/Countdown";

export default function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [nextConcert, setNextConcert] = useState<Concert | null>(null);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [concertResults, setConcertResults] = useState<ConcertResult[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [error, setError] = useState("");
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [concertsData, nextConcertData] = await Promise.all([
          getConcerts(),
          getNextConcert(),
        ]);

        setConcerts(concertsData);
        setNextConcert(nextConcertData);
        setSelectedConcert(null);
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

  function getCityFromConcertName(name: string) {
    return name.split(",")[0].trim();
  }

  function getVisibleConcerts() {
    if (!nextConcert) {
      return concerts;
    }

    const nextCity = getCityFromConcertName(nextConcert.name);

    const nextCityConcerts = concerts
      .filter(
        (concert) =>
          !concert.resultReleased &&
          getCityFromConcertName(concert.name) === nextCity,
      )
      .sort(
        (a, b) =>
          new Date(a.startsAtUtc).getTime() - new Date(b.startsAtUtc).getTime(),
      );

    const pastConcerts = concerts
      .filter((concert) => concert.resultReleased)
      .sort(
        (a, b) =>
          new Date(b.startsAtUtc).getTime() - new Date(a.startsAtUtc).getTime(),
      );

    return [...nextCityConcerts, ...pastConcerts];
  }

  function scrollLeft() {
    cardsRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    cardsRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  }

  const selectedConcertIsFuture =
    selectedConcert && !selectedConcert.resultReleased;

  return (
    <Layout>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Quais serão as próximas músicas surpresa?</h1>
            <p>
              Faça suas apostas e tente acertar as 2 músicas surpresa de cada
              show.
            </p>
          </div>

          {nextConcert && (
            <Countdown startsAtUtc={nextConcert.startsAtUtc} variant="hero" />
          )}
        </section>

        {isLoading && <p className={styles.status}>Carregando shows...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Shows da turnê</h2>

              <div className={styles.carouselWrapper}>
                <button className={styles.arrowLeft} onClick={scrollLeft}>
                  <FiChevronLeft />
                </button>

                <div ref={cardsRef} className={styles.cards}>
                  {getVisibleConcerts().map((concert) => (
                    <ConcertCard
                      key={concert.id}
                      concert={concert}
                      isSelected={selectedConcert?.id === concert.id}
                      isNextConcert={nextConcert?.id === concert.id}
                      onSelect={setSelectedConcert}
                    />
                  ))}
                </div>

                <button className={styles.arrowRight} onClick={scrollRight}>
                  <FiChevronRight />
                </button>
              </div>
            </section>

            {selectedConcert && (
              <section className={styles.details}>
                <div className={styles.detailsInfo}>
                  <h2>{selectedConcert.name}</h2>

                  <div className={styles.detailsDate}>
                    <FiCalendar />
                    <span>{formatFullDate(selectedConcert.concertDate)}</span>
                  </div>

                  <span
                    className={`${styles.detailsBadge} ${
                      selectedConcertIsFuture ? styles.nextBadge : ""
                    }`}
                  >
                    {selectedConcert.resultReleased
                      ? "Realizado"
                      : "Próximo show"}
                  </span>
                </div>

                <div className={styles.surpriseSongs}>
                  {selectedConcertIsFuture ? (
                    <Link to="/bet" className={styles.betButton}>
                      Selecionar músicas
                    </Link>
                  ) : (
                    <>
                      <h3>Músicas surpresas</h3>

                      {isLoadingResults && <p>Carregando resultados...</p>}

                      {!isLoadingResults && concertResults.length > 0 && (
                        <ol className={styles.resultList}>
                          {concertResults.map((result) => (
                            <li key={result.songId}>{result.songTitle}</li>
                          ))}
                        </ol>
                      )}

                      {!isLoadingResults && concertResults.length === 0 && (
                        <p>Aguardando resultado do show.</p>
                      )}
                    </>
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
