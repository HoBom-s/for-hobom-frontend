import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchIssueComments } from "./issue-comment.api";

export const issueCommentQueries = {
  comments: () => ["issue-comments"],

  list: (projectId: string, issueId: string) =>
    queryOptions({
      queryKey: ["issue-comments", "list", projectId, issueId],
      queryFn: ({ signal }) => fetchIssueComments({ projectId, issueId }, signal),
      ...CACHE_PROFILE.FAST,
    }),
} as const;
