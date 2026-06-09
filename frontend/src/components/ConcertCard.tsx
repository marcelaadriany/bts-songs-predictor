import type { Concert } from "../types/concert";

import styles from "./ConcertCard.module.css";

import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

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

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(concert)}
      type="button"
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

      {isPastConcert && <span className={styles.pastStatus}>Realizado</span>}

      {isFutureConcert ? (
        <Link
          to="/bet"
          className={styles.betButton}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
            event.stopPropagation()
          }
        >
          Selecionar músicas
        </Link>
      ) : (
        <span className={styles.action}>
          Ver músicas tocadas <FiArrowRight />
        </span>
      )}
    </button>
  );
}
