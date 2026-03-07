import { useEntityMutation } from "@/shared/model";
import { projectMutations } from "../api/project.mutations";
import { projectQueries } from "../api/project.queries";

export const useUpdateProject = () =>
  useEntityMutation({
    mutation: projectMutations.update(),
    invalidateKeys: [projectQueries.projects()],
    successMessage: "프로젝트를 수정했어요.",
    errorMessage: "프로젝트를 수정하지 못했어요.",
  });
