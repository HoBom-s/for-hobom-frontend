import { z } from "zod";

export const IssueKindModel = z.enum(["STORY", "TASK", "BUG", "EPIC"]);
export type IssueKind = z.infer<typeof IssueKindModel>;

export const IssuePriorityModel = z.enum([
  "HIGHEST",
  "HIGH",
  "MEDIUM",
  "LOW",
  "LOWEST",
]);
export type IssuePriority = z.infer<typeof IssuePriorityModel>;

export const IssueStatusModel = z.enum([
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
]);
export type IssueStatus = z.infer<typeof IssueStatusModel>;

export const ISSUE_KIND_LABEL: Record<IssueKind, string> = {
  STORY: "스토리",
  TASK: "작업",
  BUG: "버그",
  EPIC: "에픽",
};

export const ISSUE_PRIORITY_LABEL: Record<IssuePriority, string> = {
  HIGHEST: "가장 높음",
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
  LOWEST: "가장 낮음",
};

export const ISSUE_STATUS_LABEL: Record<IssueStatus, string> = {
  TODO: "할 일",
  IN_PROGRESS: "진행 중",
  IN_REVIEW: "검토 중",
  DONE: "완료",
};

export const ISSUE_STATUS_ORDER: IssueStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
];
