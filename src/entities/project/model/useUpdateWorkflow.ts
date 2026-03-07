import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { projectQueries } from "../api/project.queries";
import { projectMutations } from "../api/project.mutations";

export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();
  const { openErrorToast } = useToast();

  return useMutation({
    ...projectMutations.updateWorkflow(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueries.projects(),
      });
    },
    onError: () => {
      openErrorToast({ message: "워크플로우를 수정하지 못했어요." });
    },
  });
};
