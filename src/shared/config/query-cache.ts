/**
 * React Query staleTime 프로파일. 쿼리 옵션에 spread해서 사용한다.
 *
 * - `STATIC` — 변하지 않는 데이터 (코드 테이블 등). staleTime: Infinity
 * - `SLOW` — 거의 변하지 않는 데이터. staleTime: 5분
 * - `MODERATE` — 일반적인 목록/상세. staleTime: 1분
 * - `DASHBOARD` — 대시보드 위젯. staleTime: 30초
 * - `FAST` — 자주 바뀌는 데이터. staleTime: 10초
 */
export const CACHE_PROFILE = {
  STATIC: { staleTime: Infinity },
  SLOW: { staleTime: 5 * 60_000 },
  MODERATE: { staleTime: 60_000 },
  DASHBOARD: { staleTime: 30_000 },
  FAST: { staleTime: 10_000 },
} as const;
