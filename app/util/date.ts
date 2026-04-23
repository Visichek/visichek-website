const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

/** Compact date like "Apr 23, 2026" — use for card meta bars. */
const formatDateShort = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export { formatDate, formatDateShort };
