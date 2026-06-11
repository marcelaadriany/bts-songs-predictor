import { useCountdown } from "../hooks/useCountdown";
import styles from "./Countdown.module.css";

type Props = {
  startsAtUtc: string;
  variant?: "default" | "hero";
};

export function Countdown({ startsAtUtc, variant = "default" }: Props) {
  const { days, hours, minutes, seconds, isFinished } =
    useCountdown(startsAtUtc);

  const className = `${styles.countdown} ${
    variant === "hero" ? styles.hero : ""
  }`;

  if (isFinished) {
    return <span className={styles.finished}>Show iniciado</span>;
  }

  const format = (value: number) => String(value).padStart(2, "0");

  return (
    <div className={className}>
      <span className={styles.label}>Faltam</span>

      <div className={styles.time}>
        <div className={styles.item}>
          <strong>{format(days)}</strong>
          <span>Dias</span>
        </div>

        <div className={styles.item}>
          <strong>{format(hours)}</strong>
          <span>Horas</span>
        </div>

        <div className={styles.item}>
          <strong>{format(minutes)}</strong>
          <span>Min</span>
        </div>

        <div className={styles.item}>
          <strong>{format(seconds)}</strong>
          <span>Seg</span>
        </div>
      </div>
    </div>
  );
}
