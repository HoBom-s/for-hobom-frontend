import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { projectMutations } from "../api/project.mutations";
import { projectQueries } from "../api/project.queries";

export const useAddMember = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast } = useToast();

  return useMutation({
    ...projectMutations.addMember(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(projectQueries.detail(variables.projectId));
      openSuccessToast({ message: "멤버를 추가했어요" });
    },
  });
};
