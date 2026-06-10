import { useCountdown } from "../hooks/useCountdown";
import styles from "./Countdown.module.css";

type CountdownProps = {
  startsAtUtc: string;
};

export function Countdown({ startsAtUtc }: CountdownProps) {
  const { days, hours, minutes, seconds, isFinished } =
    useCountdown(startsAtUtc);

  if (isFinished) {
    return <span className={styles.finished}>Show iniciado</span>;
  }

  return (
    <div className={styles.countdown}>
      <span>{days}d</span>
      <span>{hours}h</span>
      <span>{minutes}m</span>
      <span>{seconds}s</span>
    </div>
  );
}
