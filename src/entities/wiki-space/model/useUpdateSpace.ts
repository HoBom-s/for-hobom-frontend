import { useEntityMutation } from "@/shared/model";
import { wikiSpaceMutations } from "../api/wiki-space.mutations";
import { wikiSpaceQueries } from "../api/wiki-space.queries";

export const useUpdateSpace = () =>
  useEntityMutation({
    mutation: wikiSpaceMutations.update(),
    invalidateKeys: [wikiSpaceQueries.spaces()],
    successMessage: "스페이스를 수정했어요.",
    errorMessage: "스페이스를 수정하지 못했어요.",
  });
