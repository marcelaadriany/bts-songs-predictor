import { FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "./MyBetCard.module.css";
type Song = { id: number; title: string };
type Bet = {
  concertId: number;
  concertName: string;
  concertDate: string;
  resultReleased: boolean;
  selectedSongs: Song[];
};
type Props = { bet: Bet; isExpanded: boolean; onToggle: () => void };
export default function MyBetCard({ bet, isExpanded, onToggle }: Props) {
  console.log("BET COMPLETO:", bet);
  console.log("concertDate:", bet.concertDate);
  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  const hasSongs = bet.selectedSongs.length > 0;
  return (
    <article className={styles.card}>
      {" "}
      <span className={styles.badge}>Próximo show</span>{" "}
      <h3>{bet.concertName}</h3>{" "}
      <div className={styles.date}>
        {" "}
        <FiCalendar /> <span>{formatDate(bet.concertDate)}</span>{" "}
      </div>{" "}
      <div className={styles.divider} />{" "}
      {hasSongs ? (
        <>
          {" "}
          <h4>Suas escolhas</h4>{" "}
          <ul className={styles.songList}>
            {" "}
            {bet.selectedSongs.map((song) => (
              <li key={song.id}>✓ {song.title}</li>
            ))}{" "}
          </ul>{" "}
        </>
      ) : (
        <div className={styles.emptyState}>
          {" "}
          <div className={styles.musicIcon}>♪</div>{" "}
          <strong>Você ainda não selecionou suas músicas.</strong>{" "}
          <p>Escolha 6 músicas para fazer sua aposta.</p>{" "}
        </div>
      )}{" "}
      <button type="button" className={styles.actionButton} onClick={onToggle}>
        {" "}
        {hasSongs ? "Editar músicas" : "Selecionar músicas"}{" "}
        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}{" "}
      </button>{" "}
    </article>
  );
}
