import { useEntityMutation } from "@/shared/model";
import { wikiCommentMutations } from "../api/wiki-comment.mutations";
import { wikiCommentQueries } from "../api/wiki-comment.queries";

export const useDeleteComment = () =>
  useEntityMutation({
    mutation: wikiCommentMutations.delete(),
    invalidateKeys: [wikiCommentQueries.comments()],
    successMessage: "댓글을 삭제했어요.",
    errorMessage: "댓글을 삭제하지 못했어요.",
  });
