import type { IssueType } from "@/entities/issue";

export const makeIssue = (overrides: Partial<IssueType> = {}): IssueType =>
  ({
    id: "issue-1",
    project: "proj-1",
    issueNumber: 1,
    issueKey: "PROJ-1",
    type: "TASK",
    title: "테스트 이슈",
    status: "todo",
    priority: "MEDIUM",
    reporter: "user-1",
    labels: [],
    ...overrides,
  }) as IssueType;
