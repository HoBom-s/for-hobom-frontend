// TimeRange
export type TimeRange = "LAST_1H" | "LAST_6H" | "LAST_24H" | "LAST_7D";

export interface DateRangeParams {
  from: string;
  to: string;
}

// Traffic
export interface TrafficTrendPoint {
  bucket: string;
  requestCount: number;
  rps: number;
}

export interface TrafficTrendResult {
  points: TrafficTrendPoint[];
}

export interface StatusCodeSummary {
  statusCodeClass: number;
  totalCount: number;
  percentage: number;
}

export interface StatusCodeDistributionResult {
  summary: StatusCodeSummary[];
}

export interface LatencyAnalysisResult {
  avgMs: number;
  maxMs: number;
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
  totalRequests: number;
}

export interface SlowEndpointEntry {
  method: string;
  path: string;
  avgMs: number;
  maxMs: number;
  requestCount: number;
}

export interface SlowEndpointResult {
  endpoints: SlowEndpointEntry[];
}

// Errors
export interface ErrorTrendPoint {
  bucket: string;
  errorCount: number;
}

export interface ErrorTrendResult {
  points: ErrorTrendPoint[];
}

export interface ErrorDistributionEntry {
  key: string;
  count: number;
}

export interface ErrorDistributionResult {
  byExceptionType: ErrorDistributionEntry[];
  bySource: ErrorDistributionEntry[];
  byLevel: ErrorDistributionEntry[];
}

export interface ErrorDetail {
  id: number;
  traceId: string;
  source: string;
  level: string;
  exceptionType: string;
  message: string;
  stackTrace: string | null;
  requestPath: string;
  requestMethod: string;
  timestamp: string;
}

export interface ErrorListResult {
  errors: ErrorDetail[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Search
export interface RequestLogDetail {
  id: number;
  traceId: string;
  userId: string | null;
  method: string;
  path: string;
  queryString: string | null;
  statusCode: number;
  durationMs: number;
  clientIp: string | null;
  userAgent: string | null;
  timestamp: string;
}

export interface RequestLogSearchResult {
  logs: RequestLogDetail[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface TraceSearchResult {
  requestLogs: RequestLogDetail[];
  errorLogs: ErrorDetail[];
}

// Search params
export interface RequestSearchParams {
  from?: string;
  to?: string;
  traceId?: string;
  statusCode?: number;
  method?: string;
  path?: string;
  page?: number;
  pageSize?: number;
}

export interface ErrorSearchParams {
  from?: string;
  to?: string;
  traceId?: string;
  exceptionType?: string;
  source?: string;
  page?: number;
  pageSize?: number;
}
