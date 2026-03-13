import { useEntityMutation } from "@/shared/model";
import { wikiSpaceMutations } from "../api/wiki-space.mutations";
import { wikiSpaceQueries } from "../api/wiki-space.queries";

export const useCreateSpace = () =>
  useEntityMutation({
    mutation: wikiSpaceMutations.create(),
    invalidateKeys: [wikiSpaceQueries.spaces()],
    successMessage: "스페이스를 생성했어요.",
    errorMessage: "스페이스를 생성하지 못했어요.",
  });
