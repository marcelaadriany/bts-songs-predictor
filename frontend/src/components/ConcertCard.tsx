import type { Concert } from "../types/concert";
import styles from "./ConcertCard.module.css";

import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { useCountdown } from "../hooks/useCountdown";

type Props = {
  concert: Concert;
  isSelected: boolean;
  isNextConcert: boolean;
  onSelect: (concert: Concert) => void;
};

export default function ConcertCard({
  concert,
  isSelected,
  isNextConcert,
  onSelect,
}: Props) {
  const isPastConcert = concert.resultReleased;
  const isFutureConcert = !concert.resultReleased;

  const { days, hours, minutes, seconds } = useCountdown(concert.startsAtUtc);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  function formatTime(value: number) {
    return String(value).padStart(2, "0");
  }

  return (
    <article
      className={`${styles.card} ${isSelected ? styles.selected : ""} ${
        isFutureConcert ? styles.future : ""
      }`}
      onClick={() => onSelect(concert)}
    >
      {!isPastConcert && (
        <span className={styles.nextStatus}>
          {isNextConcert ? "Próximo show" : "Em breve"}
        </span>
      )}

      <h3 className={styles.name}>{concert.name}</h3>

      <div className={styles.date}>
        <FiCalendar />
        <span>{formatDate(concert.concertDate)}</span>
      </div>

      {isFutureConcert && (
        <div className={styles.countdownWrapper}>
          <span className={styles.countdownLabel}>Faltam</span>

          <div className={styles.countdown}>
            <div className={styles.countdownItem}>
              <strong>{formatTime(days)}</strong>
              <span>Dias</span>
            </div>

            <span className={styles.separator}>:</span>

            <div className={styles.countdownItem}>
              <strong>{formatTime(hours)}</strong>
              <span>Horas</span>
            </div>

            <span className={styles.separator}>:</span>

            <div className={styles.countdownItem}>
              <strong>{formatTime(minutes)}</strong>
              <span>Min</span>
            </div>

            <span className={styles.separator}>:</span>

            <div className={styles.countdownItem}>
              <strong>{formatTime(seconds)}</strong>
              <span>Seg</span>
            </div>
          </div>
        </div>
      )}

      {isPastConcert && (
        <>
          <span className={styles.pastStatus}>Realizado</span>

          <span className={styles.action}>
            Ver músicas tocadas <FiArrowRight />
          </span>
        </>
      )}
    </article>
  );
}
