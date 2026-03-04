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

export const IssueStatusCategoryModel = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
export type IssueStatusCategory = z.infer<typeof IssueStatusCategoryModel>;

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

export const ISSUE_STATUS_CATEGORY_LABEL: Record<IssueStatusCategory, string> =
  {
    TODO: "할 일",
    IN_PROGRESS: "진행 중",
    DONE: "완료",
  };

export const ISSUE_STATUS_CATEGORY_ORDER: IssueStatusCategory[] = [
  "TODO",
  "IN_PROGRESS",
  "DONE",
];

/** statusCategory → 실제 API status ID 매핑 */
export const STATUS_CATEGORY_TO_ID: Record<IssueStatusCategory, string> = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};

/** 실제 API status ID → statusCategory 매핑 */
export const STATUS_ID_TO_CATEGORY: Record<string, IssueStatusCategory> = {
  todo: "TODO",
  "in-progress": "IN_PROGRESS",
  done: "DONE",
};

export interface IssueTransition {
  from: string;
  to: string;
  name: string;
  toCategory: IssueStatusCategory;
}

const TRANSITIONS: { from: string; to: string; name: string }[] = [
  { from: "todo", to: "in-progress", name: "작업 시작" },
  { from: "todo", to: "done", name: "완료" },
  { from: "in-progress", to: "done", name: "완료" },
  { from: "in-progress", to: "todo", name: "되돌리기" },
  { from: "done", to: "in-progress", name: "재오픈" },
  { from: "done", to: "todo", name: "되돌리기" },
];

/** 현재 status ID 기준으로 가능한 전환 목록 반환 */
export const getAvailableTransitions = (
  currentStatusId: string,
): IssueTransition[] =>
  TRANSITIONS.filter((t) => t.from === currentStatusId).map((t) => ({
    ...t,
    toCategory: STATUS_ID_TO_CATEGORY[t.to],
  }));
