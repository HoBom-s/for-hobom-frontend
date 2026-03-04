import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { wikiCommentQueries } from "../api/wiki-comment.queries";
import { wikiCommentMutations } from "../api/wiki-comment.mutations";

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const { openErrorToast } = useToast();

  return useMutation({
    ...wikiCommentMutations.update(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: wikiCommentQueries.comments(),
      });
    },
    onError: (error) => {
      console.error(error);
      openErrorToast({ message: "댓글을 수정하지 못했어요." });
    },
  });
};
