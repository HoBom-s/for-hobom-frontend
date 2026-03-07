import { useEntityMutation } from "@/shared/model";
import { issueCommentMutations } from "../api/issue-comment.mutations";
import { issueCommentQueries } from "../api/issue-comment.queries";

export const useCreateIssueComment = () =>
  useEntityMutation({
    mutation: issueCommentMutations.create(),
    invalidateKeys: [issueCommentQueries.comments()],
    successMessage: "댓글을 등록했어요.",
    errorMessage: "댓글을 등록하지 못했어요.",
  });
