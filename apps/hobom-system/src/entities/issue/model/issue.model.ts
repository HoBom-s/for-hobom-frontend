import { z } from "zod";

export const IssueKindModel = z.enum([
  "EPIC",
  "STORY",
  "TASK",
  "BUG",
  "SUBTASK",
]);
export type IssueKind = z.infer<typeof IssueKindModel>;

export const IssuePriorityModel = z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]);
export type IssuePriority = z.infer<typeof IssuePriorityModel>;

export const ISSUE_KIND_LABEL: Record<IssueKind, string> = {
  EPIC: "에픽",
  STORY: "스토리",
  TASK: "작업",
  BUG: "버그",
  SUBTASK: "하위 작업",
};

export const ISSUE_PRIORITY_LABEL: Record<IssuePriority, string> = {
  CRITICAL: "긴급",
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
};
