import { queryOptions } from "@tanstack/react-query";
import {
  fetchLogLevelSummary,
  fetchLogServiceSummary,
  fetchLogStatusSummary,
  fetchLogRequestSummary,
  fetchLogEndpointErrors,
  fetchLogSearch,
} from "./log.api";
import type { LogSearchParams } from "./log.type";

const DASHBOARD_STALE_TIME = 30_000;

export const logQueries = {
  all: () => ["logs"],

  levelSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "level-summary", hours],
      queryFn: () => fetchLogLevelSummary(hours),
      staleTime: DASHBOARD_STALE_TIME,
    }),

  serviceSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "service-summary", hours],
      queryFn: () => fetchLogServiceSummary(hours),
      staleTime: DASHBOARD_STALE_TIME,
    }),

  statusSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "status-summary", hours],
      queryFn: () => fetchLogStatusSummary(hours),
      staleTime: DASHBOARD_STALE_TIME,
    }),

  requestSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "request-summary", hours],
      queryFn: () => fetchLogRequestSummary(hours),
      staleTime: DASHBOARD_STALE_TIME,
    }),

  endpointErrors: (hours: number, limit?: number) =>
    queryOptions({
      queryKey: ["logs", "endpoint-errors", hours, limit],
      queryFn: () => fetchLogEndpointErrors(hours, limit),
      staleTime: DASHBOARD_STALE_TIME,
    }),

  search: (params: LogSearchParams) =>
    queryOptions({
      queryKey: ["logs", "search", params],
      queryFn: () => fetchLogSearch(params),
      staleTime: 10_000,
    }),
} as const;
