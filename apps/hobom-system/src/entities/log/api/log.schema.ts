import { HoBomSchema } from "hobom-schema";
import type { PaginatedItems } from "@/shared/api";
import type { Schema } from "hobom-schema";
import type {
  LogLevelCount,
  LogServiceCount,
  LogStatusCount,
  LogRequestCount,
  LogEndpointError,
  LogEntry,
} from "./log.type";

export const logLevelCountSchema: Schema<LogLevelCount> = HoBomSchema.object({
  level: HoBomSchema.string(),
  count: HoBomSchema.number(),
});

export const logLevelCountsSchema: Schema<LogLevelCount[]> =
  HoBomSchema.array(logLevelCountSchema);

export const logServiceCountSchema: Schema<LogServiceCount> = HoBomSchema.object({
  serviceType: HoBomSchema.string(),
  count: HoBomSchema.number(),
});

export const logServiceCountsSchema: Schema<LogServiceCount[]> =
  HoBomSchema.array(logServiceCountSchema);

export const logStatusCountSchema: Schema<LogStatusCount> = HoBomSchema.object({
  statusCode: HoBomSchema.number(),
  count: HoBomSchema.number(),
});

export const logStatusCountsSchema: Schema<LogStatusCount[]> =
  HoBomSchema.array(logStatusCountSchema);

export const logRequestCountSchema: Schema<LogRequestCount> = HoBomSchema.object({
  minute: HoBomSchema.string(),
  totalRequests: HoBomSchema.number(),
});

export const logRequestCountsSchema: Schema<LogRequestCount[]> =
  HoBomSchema.array(logRequestCountSchema);

export const logEndpointErrorSchema: Schema<LogEndpointError> = HoBomSchema.object({
  path: HoBomSchema.string(),
  httpMethod: HoBomSchema.string(),
  totalCount: HoBomSchema.number(),
  errorCount: HoBomSchema.number(),
  errorRate: HoBomSchema.number(),
});

export const logEndpointErrorsSchema: Schema<LogEndpointError[]> =
  HoBomSchema.array(logEndpointErrorSchema);

export const logEntrySchema: Schema<LogEntry> = HoBomSchema.object({
  id: HoBomSchema.number(),
  serviceType: HoBomSchema.string(),
  level: HoBomSchema.string(),
  traceId: HoBomSchema.string(),
  message: HoBomSchema.string(),
  httpMethod: HoBomSchema.string(),
  path: HoBomSchema.string(),
  statusCode: HoBomSchema.number(),
  host: HoBomSchema.string(),
  userId: HoBomSchema.string(),
  payload: HoBomSchema.string(),
  timestamp: HoBomSchema.date(),
});

export const logEntryPageSchema: Schema<PaginatedItems<LogEntry>> = HoBomSchema.object({
  items: HoBomSchema.array(logEntrySchema),
  totalCount: HoBomSchema.number(),
  offset: HoBomSchema.number(),
  limit: HoBomSchema.number(),
});
