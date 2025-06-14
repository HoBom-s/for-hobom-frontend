export const getTodayMenuId = (query: URLSearchParams): string | null => {
  return query.get("todayMenuId");
};
