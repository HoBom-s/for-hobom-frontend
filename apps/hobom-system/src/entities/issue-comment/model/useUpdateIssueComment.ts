import { useEntityMutation } from "@/shared/model";
import { issueCommentMutations } from "../api/issue-comment.mutations";
import { issueCommentQueries } from "../api/issue-comment.queries";

export const useUpdateIssueComment = () =>
  useEntityMutation({
    mutation: issueCommentMutations.update(),
    invalidateKeys: [issueCommentQueries.comments()],
    successMessage: "댓글을 수정했어요.",
    errorMessage: "댓글을 수정하지 못했어요.",
  });
