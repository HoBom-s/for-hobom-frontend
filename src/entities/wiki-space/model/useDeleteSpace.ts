import { useEntityMutation } from "@/shared/model";
import { wikiSpaceMutations } from "../api/wiki-space.mutations";
import { wikiSpaceQueries } from "../api/wiki-space.queries";

export const useDeleteSpace = () =>
  useEntityMutation({
    mutation: wikiSpaceMutations.delete(),
    invalidateKeys: [wikiSpaceQueries.spaces()],
    successMessage: "스페이스를 삭제했어요.",
    errorMessage: "스페이스를 삭제하지 못했어요.",
  });
