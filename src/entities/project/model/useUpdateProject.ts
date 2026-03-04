import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { projectQueries } from "../api/project.queries";
import { projectMutations } from "../api/project.mutations";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...projectMutations.update(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueries.projects(),
      });
      openSuccessToast({ message: "프로젝트를 수정했어요." });
    },
    onError: () => {
      openErrorToast({ message: "프로젝트를 수정하지 못했어요." });
    },
  });
};
