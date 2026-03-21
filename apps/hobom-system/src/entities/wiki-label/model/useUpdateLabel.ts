import { useEntityMutation } from "@/shared/model";
import { wikiLabelMutations } from "../api/wiki-label.mutations";
import { wikiLabelQueries } from "../api/wiki-label.queries";

export const useUpdateLabel = () =>
  useEntityMutation({
    mutation: wikiLabelMutations.update(),
    invalidateKeys: [wikiLabelQueries.labels()],
    successMessage: "라벨을 수정했어요.",
    errorMessage: "라벨을 수정하지 못했어요.",
  });
