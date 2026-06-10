import { useEffect, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
};

const emptyCountdown: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isFinished: true,
};

function calculateTimeLeft(targetDate?: string): Countdown {
  if (!targetDate) {
    return emptyCountdown;
  }

  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return emptyCountdown;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isFinished: false,
  };
}

export function useCountdown(targetDate?: string): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
