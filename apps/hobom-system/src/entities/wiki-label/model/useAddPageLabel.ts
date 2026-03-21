import { useEntityMutation } from "@/shared/model";
import { wikiLabelMutations } from "../api/wiki-label.mutations";
import { wikiLabelQueries } from "../api/wiki-label.queries";

export const useAddPageLabel = () =>
  useEntityMutation({
    mutation: wikiLabelMutations.addToPage(),
    invalidateKeys: [wikiLabelQueries.labels()],
    successMessage: "라벨을 추가했어요.",
    errorMessage: "라벨을 추가하지 못했어요.",
  });
