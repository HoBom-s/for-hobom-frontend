import { useEntityMutation } from "@/shared/model";
import { wikiLabelMutations } from "../api/wiki-label.mutations";
import { wikiLabelQueries } from "../api/wiki-label.queries";

export const useDeleteLabel = () =>
  useEntityMutation({
    mutation: wikiLabelMutations.delete(),
    invalidateKeys: [wikiLabelQueries.labels()],
    successMessage: "라벨을 삭제했어요.",
    errorMessage: "라벨을 삭제하지 못했어요.",
  });
