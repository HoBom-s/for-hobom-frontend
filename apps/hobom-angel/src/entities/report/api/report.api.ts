import { httpClient, parseResponse } from "@/shared/api";
import { pendingReportsSchema } from "./report.schema";
import type { Report } from "../model/report.model";
import type { ResolveReportInput } from "./report.type";

const parsePending = parseResponse(pendingReportsSchema, "GET /reports/pending");

/** The operator's pending report queue (§09 신고 처리). */
export const getPendingReports = (limit = 50, signal?: AbortSignal): Promise<Report[]> =>
  httpClient
    .get(`/reports/pending?limit=${limit}`, { signal })
    .then(parsePending)
    .then((raw): Report[] => raw);

/** Resolve a report — dismiss it or uphold it (with an optional note). */
export const resolveReport = (reportId: string, input: ResolveReportInput): Promise<void> =>
  httpClient.post(`/reports/${reportId}/resolution`, input).then(() => undefined);
