import { useEntityMutation } from "@/shared/model";
import { projectMutations } from "../api/project.mutations";
import { projectQueries } from "../api/project.queries";

export const useDeleteProject = () =>
  useEntityMutation({
    mutation: projectMutations.delete(),
    invalidateKeys: [projectQueries.projects()],
    successMessage: "프로젝트를 삭제했어요.",
    errorMessage: "프로젝트를 삭제하지 못했어요.",
  });
