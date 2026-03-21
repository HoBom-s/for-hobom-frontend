import { useEntityMutation } from "@/shared/model";
import { wikiLabelMutations } from "../api/wiki-label.mutations";
import { wikiLabelQueries } from "../api/wiki-label.queries";

export const useCreateLabel = () =>
  useEntityMutation({
    mutation: wikiLabelMutations.create(),
    invalidateKeys: [wikiLabelQueries.labels()],
    successMessage: "라벨을 생성했어요.",
    errorMessage: "라벨을 생성하지 못했어요.",
  });
