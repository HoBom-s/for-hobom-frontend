import { queryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import {
  fetchLogLevelSummary,
  fetchLogServiceSummary,
  fetchLogStatusSummary,
  fetchLogRequestSummary,
  fetchLogEndpointErrors,
  fetchLogSearch,
} from "./log.api";
import type { LogSearchParams } from "./log.type";

export const logQueries = {
  all: () => ["logs"],

  levelSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "level-summary", hours],
      queryFn: () => fetchLogLevelSummary(hours),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  serviceSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "service-summary", hours],
      queryFn: () => fetchLogServiceSummary(hours),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  statusSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "status-summary", hours],
      queryFn: () => fetchLogStatusSummary(hours),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  requestSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "request-summary", hours],
      queryFn: () => fetchLogRequestSummary(hours),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  endpointErrors: (hours: number, limit?: number) =>
    queryOptions({
      queryKey: ["logs", "endpoint-errors", hours, limit],
      queryFn: () => fetchLogEndpointErrors(hours, limit),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  search: (params: LogSearchParams) =>
    queryOptions({
      queryKey: ["logs", "search", params],
      queryFn: () => fetchLogSearch(params),
      ...CACHE_PROFILE.FAST,
    }),
} as const;
