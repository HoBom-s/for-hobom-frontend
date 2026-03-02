import type {
  IssueKind,
  IssuePriority,
  IssueStatus,
} from "../model/issue.model";

export interface IssueType {
  id: { value: string };
  projectId: string;
  key: string;
  title: string;
  description: string;
  kind: IssueKind;
  priority: IssuePriority;
  status: IssueStatus;
  assignee: { id: string; name: string } | null;
  reporter: { id: string; name: string };
  sprintId: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}
