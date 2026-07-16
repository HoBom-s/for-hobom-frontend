const time = (value: Date): string =>
  value.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });

/** e.g. "7월 4일 (토) · 14:00–17:00" from the event's start/end ISO datetimes. */
export const formatEventPeriod = (startAt: string, endAt: string): string => {
  const start = new Date(startAt);
  const end = new Date(endAt);
  const date = start.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return `${date} · ${time(start)}–${time(end)}`;
};
