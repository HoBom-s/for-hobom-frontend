import { queryOptions } from "hobom-data";
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
      queryFn: ({ signal }) => fetchLogLevelSummary(hours, signal),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  serviceSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "service-summary", hours],
      queryFn: ({ signal }) => fetchLogServiceSummary(hours, signal),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  statusSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "status-summary", hours],
      queryFn: ({ signal }) => fetchLogStatusSummary(hours, signal),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  requestSummary: (hours: number) =>
    queryOptions({
      queryKey: ["logs", "request-summary", hours],
      queryFn: ({ signal }) => fetchLogRequestSummary(hours, signal),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  endpointErrors: (hours: number, limit?: number) =>
    queryOptions({
      queryKey: ["logs", "endpoint-errors", hours, limit],
      queryFn: ({ signal }) => fetchLogEndpointErrors(hours, limit, signal),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  search: (params: LogSearchParams) =>
    queryOptions({
      queryKey: ["logs", "search", params],
      queryFn: ({ signal }) => fetchLogSearch(params, signal),
      ...CACHE_PROFILE.FAST,
    }),
} as const;
