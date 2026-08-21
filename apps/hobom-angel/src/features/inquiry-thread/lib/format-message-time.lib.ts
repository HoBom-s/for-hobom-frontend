/** Render a message timestamp as a short Korean date-time (빈 문자열 when unknown). */
export const formatMessageTime = (iso: string | null): string => {
  if (!iso) return "";

  return new Date(iso).toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};
