export { reportQueries } from "./api/report.queries";
export { reportMutations } from "./api/report.mutations";
export { TARGET_LABEL, REASON_LABEL, RESOLUTION_LABEL } from "./model/report.model";
export type {
  Report,
  ReportTargetType,
  ReportReason,
  ReportStatus,
  ReportResolution,
} from "./model/report.model";
export type { ResolveReportInput } from "./api/report.type";
