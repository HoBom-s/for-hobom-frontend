import { useEntityMutation } from "@/shared/model";
import { issueCommentMutations } from "../api/issue-comment.mutations";
import { issueCommentQueries } from "../api/issue-comment.queries";

export const useDeleteIssueComment = () =>
  useEntityMutation({
    mutation: issueCommentMutations.delete(),
    invalidateKeys: [issueCommentQueries.comments()],
    successMessage: "댓글을 삭제했어요.",
    errorMessage: "댓글을 삭제하지 못했어요.",
  });
