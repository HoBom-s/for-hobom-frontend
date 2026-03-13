import { useEntityMutation } from "@/shared/model";
import { projectMutations } from "../api/project.mutations";
import { projectQueries } from "../api/project.queries";

export const useCreateProject = () =>
  useEntityMutation({
    mutation: projectMutations.create(),
    invalidateKeys: [projectQueries.projects()],
    successMessage: "프로젝트를 생성했어요.",
    errorMessage: "프로젝트를 생성하지 못했어요.",
  });
