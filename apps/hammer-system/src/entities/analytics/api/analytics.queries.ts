import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import {
  fetchTrafficTrends,
  fetchStatusCodes,
  fetchLatency,
  fetchSlowEndpoints,
  fetchErrorTrend,
  fetchErrorDistribution,
  fetchRecentErrors,
  fetchRequests,
  fetchErrors,
  fetchTrace,
} from "./analytics.api";
import { toDateRange } from "../model/time-range.model";
import type { TimeRange, RequestSearchParams, ErrorSearchParams } from "./analytics.type";

export const analyticsQueries = {
  all: () => ["analytics"],

  trafficTrends: (range: TimeRange) =>
    queryOptions({
      queryKey: ["analytics", "traffic-trends", range],
      queryFn: () => fetchTrafficTrends(toDateRange(range)),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  statusCodes: (range: TimeRange) =>
    queryOptions({
      queryKey: ["analytics", "status-codes", range],
      queryFn: () => fetchStatusCodes(toDateRange(range)),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  latency: (range: TimeRange) =>
    queryOptions({
      queryKey: ["analytics", "latency", range],
      queryFn: () => fetchLatency(toDateRange(range)),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  slowEndpoints: (range: TimeRange) =>
    queryOptions({
      queryKey: ["analytics", "slow-endpoints", range],
      queryFn: () => fetchSlowEndpoints(toDateRange(range)),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  errorTrend: (range: TimeRange) =>
    queryOptions({
      queryKey: ["analytics", "error-trend", range],
      queryFn: () => fetchErrorTrend(toDateRange(range)),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  errorDistribution: (range: TimeRange) =>
    queryOptions({
      queryKey: ["analytics", "error-distribution", range],
      queryFn: () => fetchErrorDistribution(toDateRange(range)),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  recentErrors: (range: TimeRange) =>
    queryOptions({
      queryKey: ["analytics", "recent-errors", range],
      queryFn: () => fetchRecentErrors(toDateRange(range)),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  requests: (params: RequestSearchParams) =>
    queryOptions({
      queryKey: ["analytics", "requests", params],
      queryFn: () => fetchRequests(params),
      ...CACHE_PROFILE.FAST,
    }),

  errors: (params: ErrorSearchParams) =>
    queryOptions({
      queryKey: ["analytics", "errors", params],
      queryFn: () => fetchErrors(params),
      ...CACHE_PROFILE.FAST,
    }),

  trace: (traceId: string) =>
    queryOptions({
      queryKey: ["analytics", "trace", traceId],
      queryFn: () => fetchTrace(traceId),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
