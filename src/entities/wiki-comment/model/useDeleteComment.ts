import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { wikiCommentQueries } from "../api/wiki-comment.queries";
import { wikiCommentMutations } from "../api/wiki-comment.mutations";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...wikiCommentMutations.delete(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: wikiCommentQueries.comments(),
      });
      openSuccessToast({ message: "댓글을 삭제했어요." });
    },
    onError: (error) => {
      console.error(error);
      openErrorToast({ message: "댓글을 삭제하지 못했어요." });
    },
  });
};
