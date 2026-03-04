import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { projectQueries } from "../api/project.queries";
import { projectMutations } from "../api/project.mutations";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...projectMutations.delete(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueries.projects(),
      });
      openSuccessToast({ message: "프로젝트를 삭제했어요." });
    },
    onError: () => {
      openErrorToast({ message: "프로젝트를 삭제하지 못했어요." });
    },
  });
};
