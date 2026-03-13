import { useEntityMutation } from "@/shared/model";
import { wikiCommentMutations } from "../api/wiki-comment.mutations";
import { wikiCommentQueries } from "../api/wiki-comment.queries";

export const useUpdateComment = () =>
  useEntityMutation({
    mutation: wikiCommentMutations.update(),
    invalidateKeys: [wikiCommentQueries.comments()],
    successMessage: null,
    errorMessage: "댓글을 수정하지 못했어요.",
  });
