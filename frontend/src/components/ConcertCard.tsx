import type { Concert } from "../types/concert";

import styles from "./ConcertCard.module.css";

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
  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  function getStatusLabel() {
    if (isNextConcert) {
      return "Próximo show";
    }

    if (concert.resultReleased) {
      return "Realizado";
    }

    return "Próximo show";
  }

  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(concert)}
      type="button"
    >
      <span className={styles.status}>{getStatusLabel()}</span>

      <h3 className={styles.name}>{concert.name}</h3>

      <p className={styles.date}>{formatDate(concert.concertDate)}</p>

      <span className={styles.action}>Ver músicas tocadas</span>
    </button>
  );
}
