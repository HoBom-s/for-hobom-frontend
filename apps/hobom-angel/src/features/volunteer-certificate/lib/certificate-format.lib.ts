/** Minutes → "2시간 30분" / "45분" / "3시간". */
export const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) return `${rest}분`;
  if (rest === 0) return `${hours}시간`;

  return `${hours}시간 ${rest}분`;
};

/** ISO date → "2026년 8월 16일". */
export const formatCertDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

/** ISO date → "8월 16일" (participation day, year omitted). */
export const formatDay = (iso: string): string =>
  new Date(iso).toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
