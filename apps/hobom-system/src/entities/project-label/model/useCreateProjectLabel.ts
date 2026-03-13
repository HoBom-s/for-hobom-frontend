import { useEntityMutation } from "@/shared/model";
import { projectLabelMutations } from "../api/project-label.mutations";
import { projectLabelQueries } from "../api/project-label.queries";

export const useCreateProjectLabel = () =>
  useEntityMutation({
    mutation: projectLabelMutations.create(),
    invalidateKeys: [projectLabelQueries.labels()],
    successMessage: "라벨을 생성했어요.",
    errorMessage: "라벨을 생성하지 못했어요.",
  });
