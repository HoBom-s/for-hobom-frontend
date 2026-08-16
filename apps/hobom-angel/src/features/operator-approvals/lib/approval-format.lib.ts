/** "7월 26일" — the request's submitted date, or null when absent. */
export const formatApprovalDate = (iso: string | null): string | null =>
  iso ? new Date(iso).toLocaleDateString("ko-KR", { month: "long", day: "numeric" }) : null;
