import { queryOptions } from "@tanstack/react-query";
import { fetchIssueComments } from "./issue-comment.api";

export const issueCommentQueries = {
  comments: () => ["issue-comments"],

  list: (projectId: string, issueId: string) =>
    queryOptions({
      queryKey: ["issue-comments", "list", projectId, issueId],
      queryFn: () => fetchIssueComments({ projectId, issueId }),
    }),
} as const;
