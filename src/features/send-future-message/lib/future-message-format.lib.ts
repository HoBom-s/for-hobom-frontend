export const formatDate = (raw: string) => {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(raw));
  } catch {
    return raw;
  }
};

export const formatTime = (raw: string) => {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(raw));
  } catch {
    return "";
  }
};
