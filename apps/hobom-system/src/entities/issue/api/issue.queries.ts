import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchIssuesByProject, fetchIssueById } from "./issue.api";

export const issueQueries = {
  issues: () => ["issues"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["issues", "list", projectId],
      queryFn: ({ signal }) => fetchIssuesByProject({ projectId }, signal),
      ...CACHE_PROFILE.MODERATE,
    }),

  detail: (projectId: string, issueId: string) =>
    queryOptions({
      queryKey: ["issues", "detail", projectId, issueId],
      queryFn: ({ signal }) => fetchIssueById({ projectId, issueId }, signal),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
