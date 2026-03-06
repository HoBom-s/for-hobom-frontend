import { mutationOptions } from "@tanstack/react-query";
import {
  postCreateIssueComment,
  patchUpdateIssueComment,
  deleteIssueComment,
} from "./issue-comment.api";

export const issueCommentMutations = {
  comments: () => ["issue-comments"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...issueCommentMutations.comments(), "create"] as const,
      mutationFn: postCreateIssueComment,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...issueCommentMutations.comments(), "update"] as const,
      mutationFn: patchUpdateIssueComment,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...issueCommentMutations.comments(), "delete"] as const,
      mutationFn: deleteIssueComment,
    }),
} as const;
