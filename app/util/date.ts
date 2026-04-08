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

export { formatDate };
