import type {
  IssueKind,
  IssuePriority,
  IssueStatusCategory,
} from "../model/issue.model";

export interface IssueType {
  id: string;
  project: string;
  issueNumber: number;
  issueKey: string;
  type: IssueKind;
  title: string;
  description?: string;
  status: string;
  statusCategory: IssueStatusCategory;
  priority: IssuePriority;
  resolution?: string;
  reporter: string;
  assignee?: string;
  sprint?: string;
  parent?: string;
  labels: string[];
  storyPoints?: number;
  dueDate?: string;
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
