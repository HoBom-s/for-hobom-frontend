import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { wikiCommentQueries } from "../api/wiki-comment.queries";
import { wikiCommentMutations } from "../api/wiki-comment.mutations";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...wikiCommentMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: wikiCommentQueries.comments(),
      });
      openSuccessToast({ message: "댓글을 등록했어요." });
    },
    onError: (error) => {
      console.error(error);
      openErrorToast({ message: "댓글을 등록하지 못했어요." });
    },
  });
};
