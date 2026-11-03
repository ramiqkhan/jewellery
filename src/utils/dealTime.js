import { useEffect, useState } from 'react';

// "2d 4h left" / "5h 12m left" / "12m left"
export function timeLeft(endsAt, now) {
  const ms = new Date(endsAt) - now;
  if (ms <= 0) return 'Ended';
  const minutes = Math.floor(ms / 60000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes % 60}m left`;
  return `${minutes}m left`;
}

// Re-renders once a minute so the countdowns stay current
export function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
