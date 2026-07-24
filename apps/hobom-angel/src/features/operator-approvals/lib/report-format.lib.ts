import { REASON_LABEL, TARGET_LABEL } from "@/entities/report";
import type { Report } from "@/entities/report";

/** A privacy-safe reporter handle (no PII is exposed). */
export const maskReporter = (reporterId: string): string => `신고자 ${reporterId.slice(-6)}`;

/** The card heading: "동물 신고 · 동물 학대". */
export const reportHeadline = (report: Report): string =>
  `${TARGET_LABEL[report.targetType]} 신고 · ${REASON_LABEL[report.reason]}`;
