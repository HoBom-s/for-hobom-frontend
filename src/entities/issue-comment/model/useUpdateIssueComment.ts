import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { issueCommentQueries } from "../api/issue-comment.queries";
import { issueCommentMutations } from "../api/issue-comment.mutations";

export const useUpdateIssueComment = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...issueCommentMutations.update(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: issueCommentQueries.comments(),
      });
      openSuccessToast({ message: "댓글을 수정했어요." });
    },
    onError: () => {
      openErrorToast({ message: "댓글을 수정하지 못했어요." });
    },
  });
};
