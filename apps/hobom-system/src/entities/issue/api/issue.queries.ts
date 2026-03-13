import { queryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchIssuesByProject, fetchIssueById } from "./issue.api";

export const issueQueries = {
  issues: () => ["issues"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["issues", "list", projectId],
      queryFn: () => fetchIssuesByProject({ projectId }),
      ...CACHE_PROFILE.MODERATE,
    }),

  detail: (projectId: string, issueId: string) =>
    queryOptions({
      queryKey: ["issues", "detail", projectId, issueId],
      queryFn: () => fetchIssueById({ projectId, issueId }),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
