export const CACHE_PROFILE = {
  STATIC: { staleTime: Infinity },
  SLOW: { staleTime: 5 * 60_000 },
  MODERATE: { staleTime: 60_000 },
  DASHBOARD: { staleTime: 30_000 },
  FAST: { staleTime: 10_000 },
} as const;
