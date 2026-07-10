import { internalHttpClient } from "@/shared/api";
import type { HttpResponseType, PaginatedItems } from "@/shared/api";
import type {
  LogLevelCount,
  LogServiceCount,
  LogStatusCount,
  LogRequestCount,
  LogEndpointError,
  LogEntry,
  LogSearchParams,
} from "./log.type";

const BASE = "/logs";

export const fetchLogLevelSummary = (hours: number, signal?: AbortSignal) =>
  internalHttpClient.get<HttpResponseType<LogLevelCount[]>>(`${BASE}/level-summary?hours=${hours}`, {
    signal,
  });

export const fetchLogServiceSummary = (hours: number, signal?: AbortSignal) =>
  internalHttpClient.get<HttpResponseType<LogServiceCount[]>>(
    `${BASE}/service-summary?hours=${hours}`,
    { signal },
  );

export const fetchLogStatusSummary = (hours: number, signal?: AbortSignal) =>
  internalHttpClient.get<HttpResponseType<LogStatusCount[]>>(
    `${BASE}/status-summary?hours=${hours}`,
    { signal },
  );

export const fetchLogRequestSummary = (hours: number, signal?: AbortSignal) =>
  internalHttpClient.get<HttpResponseType<LogRequestCount[]>>(
    `${BASE}/request-summary?hours=${hours}`,
    { signal },
  );

export const fetchLogEndpointErrors = (hours: number, limit = 20, signal?: AbortSignal) =>
  internalHttpClient.get<HttpResponseType<LogEndpointError[]>>(
    `${BASE}/endpoint-errors?hours=${hours}&limit=${limit}`,
    { signal },
  );

export const fetchLogSearch = (params: LogSearchParams, signal?: AbortSignal) => {
  const query = new URLSearchParams();

  if (params.serviceType) query.set("serviceType", params.serviceType);
  if (params.httpMethod) query.set("httpMethod", params.httpMethod);
  if (params.statusCode != null && params.statusCode > 0) {
    query.set("statusCode", String(params.statusCode));
  }
  if (params.startedAt) query.set("startedAt", params.startedAt);
  if (params.endedAt) query.set("endedAt", params.endedAt);
  if (params.page != null) query.set("page", String(params.page));
  if (params.size != null) query.set("size", String(params.size));

  return internalHttpClient.get<HttpResponseType<PaginatedItems<LogEntry>>>(
    `${BASE}?${query.toString()}`,
    { signal },
  );
};
