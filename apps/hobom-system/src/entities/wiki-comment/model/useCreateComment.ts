import { useEntityMutation } from "@/shared/model";
import { wikiCommentMutations } from "../api/wiki-comment.mutations";
import { wikiCommentQueries } from "../api/wiki-comment.queries";

export const useCreateComment = () =>
  useEntityMutation({
    mutation: wikiCommentMutations.create(),
    invalidateKeys: [wikiCommentQueries.comments()],
    successMessage: "댓글을 등록했어요.",
    errorMessage: "댓글을 등록하지 못했어요.",
  });
