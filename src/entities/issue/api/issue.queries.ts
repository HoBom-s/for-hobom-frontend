import { queryOptions } from "@tanstack/react-query";
import { fetchIssuesByProject, fetchIssueById } from "./issue.api";

export const issueQueries = {
  issues: () => ["issues"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["issues", "list", projectId],
      queryFn: () => fetchIssuesByProject({ projectId }),
    }),

  detail: (projectId: string, issueId: string) =>
    queryOptions({
      queryKey: ["issues", "detail", projectId, issueId],
      queryFn: () => fetchIssueById({ projectId, issueId }),
    }),
} as const;
