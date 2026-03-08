import type { IssueKind, IssuePriority } from "../model/issue.model";

export interface IssueType {
  id: string;
  project: string;
  issueNumber: number;
  issueKey: string;
  type: IssueKind;
  title: string;
  description?: string;
  /** 워크플로우 상태 ID. status transition API에서 사용. */
  status: string;
  priority: IssuePriority;
  resolution?: string;
  reporter: string;
  /** 담당자 ID. 미할당 시 undefined. */
  assignee?: string;
  /** 소속 스프린트 ID. 백로그 이슈는 undefined. */
  sprint?: string;
  /** 부모 이슈 ID. Epic→Story→Task 계층 구조에서 사용. */
  parent?: string;
  labels: string[];
  storyPoints?: number;
  /** ISO 8601 문자열. 마감일 미설정 시 undefined. */
  dueDate?: string;
  /** ISO 8601 문자열. 해결 전이면 undefined. */
  resolvedAt?: string;
}

export interface CreateIssueRequest {
  type: IssueKind;
  title: string;
  description?: string;
  priority?: IssuePriority;
  assignee?: string;
  sprint?: string;
  parent?: string;
  labels?: string[];
}

export interface UpdateIssueRequest {
  title?: string;
  description?: string;
  priority?: IssuePriority;
  sprint?: string;
  storyPoints?: number;
  labels?: string[];
  dueDate?: string;
  parent?: string | null;
}

export interface TransitionIssueRequest {
  statusId: string;
}

export interface AssignIssueRequest {
  assignee?: string;
}
