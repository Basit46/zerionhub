export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-US", options);
}

export function formatNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    const mil = (value / 1_000_000).toFixed(2);
    return `${value > 0 ? "+" : ""}${mil}M`;
  }

  return `${value > 0 ? "+" : ""}${value}`;
}

export const formatLastActiveTime = (lastActive: string) => {
  const now = new Date();
  const past = new Date(lastActive);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    const amount = Math.floor(diffInSeconds / seconds);
    if (amount >= 1) {
      return rtf.format(-amount, unit);
    }
  }

  return "Just now";
};

export function truncateAddress(address: string | null | undefined): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTimestamp2(timestamp: number) {
  const date = new Date(
    timestamp.toString().length === 10 ? timestamp * 1000 : timestamp
  );

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
