import { useEntityMutation } from "@/shared/model";
import { wikiLabelMutations } from "../api/wiki-label.mutations";
import { wikiLabelQueries } from "../api/wiki-label.queries";

export const useRemovePageLabel = () =>
  useEntityMutation({
    mutation: wikiLabelMutations.removeFromPage(),
    invalidateKeys: [wikiLabelQueries.labels()],
    successMessage: "라벨을 제거했어요.",
    errorMessage: "라벨을 제거하지 못했어요.",
  });
