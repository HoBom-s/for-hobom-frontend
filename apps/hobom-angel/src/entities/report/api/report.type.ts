import type {
  ReportReason,
  ReportResolution,
  ReportStatus,
  ReportTargetType,
} from "../model/report.model";

export interface RawReport {
  id: string;
  reporterId: string;
  targetType: ReportTargetType;
  targetRef: string;
  reason: ReportReason;
  detail: string;
  status: ReportStatus;
  resolution: ReportResolution | null;
  resolvedAt: string | null;
}

/** `POST /reports/:id/resolution` request. */
export interface ResolveReportInput {
  resolution: ReportResolution;
  note?: string;
}
