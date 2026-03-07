import { useEntityMutation } from "@/shared/model";
import { projectMutations } from "../api/project.mutations";
import { projectQueries } from "../api/project.queries";

export const useUpdateWorkflow = () =>
  useEntityMutation({
    mutation: projectMutations.updateWorkflow(),
    invalidateKeys: [projectQueries.projects()],
    successMessage: null,
    errorMessage: "워크플로우를 수정하지 못했어요.",
  });
