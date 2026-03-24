import { httpClient } from "@/shared/api";
import type {
  DateRangeParams,
  TrafficTrendResult,
  StatusCodeDistributionResult,
  LatencyAnalysisResult,
  SlowEndpointResult,
  ErrorTrendResult,
  ErrorDistributionResult,
  ErrorListResult,
  RequestLogSearchResult,
  TraceSearchResult,
  RequestSearchParams,
  ErrorSearchParams,
} from "./analytics.type";

const toQuery = (params: object) => {
  const entries = Object.entries(params).filter(([, v]) => v != null && v !== "");

  return entries.length ? `?${new URLSearchParams(entries.map(([k, v]) => [k, String(v)]))}` : "";
};

// --- Traffic ---

export const fetchTrafficTrends = (params: DateRangeParams) =>
  httpClient.get<TrafficTrendResult>(`/analytics/traffic/trends${toQuery(params)}`);

export const fetchStatusCodes = (params: DateRangeParams) =>
  httpClient.get<StatusCodeDistributionResult>(`/analytics/traffic/status-codes${toQuery(params)}`);

export const fetchLatency = (params: DateRangeParams) =>
  httpClient.get<LatencyAnalysisResult>(`/analytics/traffic/latency${toQuery(params)}`);

export const fetchSlowEndpoints = (params: DateRangeParams) =>
  httpClient.get<SlowEndpointResult>(`/analytics/traffic/latency/slow-endpoints${toQuery(params)}`);

// --- Errors ---

export const fetchErrorTrend = (params: DateRangeParams) =>
  httpClient.get<ErrorTrendResult>(`/analytics/errors/trend${toQuery(params)}`);

export const fetchErrorDistribution = (params: DateRangeParams) =>
  httpClient.get<ErrorDistributionResult>(`/analytics/errors/distribution${toQuery(params)}`);

export const fetchRecentErrors = (params: DateRangeParams & { page?: number; pageSize?: number }) =>
  httpClient.get<ErrorListResult>(`/analytics/errors/recent${toQuery(params)}`);

// --- Search ---

export const fetchRequests = (params: RequestSearchParams) =>
  httpClient.get<RequestLogSearchResult>(`/search/requests${toQuery(params)}`);

export const fetchErrors = (params: ErrorSearchParams) =>
  httpClient.get<ErrorListResult>(`/search/errors${toQuery(params)}`);

export const fetchTrace = (traceId: string) =>
  httpClient.get<TraceSearchResult>(`/search/trace/${traceId}`);
