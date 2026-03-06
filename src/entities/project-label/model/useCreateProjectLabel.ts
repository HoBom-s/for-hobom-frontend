import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { projectLabelQueries } from "../api/project-label.queries";
import { projectLabelMutations } from "../api/project-label.mutations";

export const useCreateProjectLabel = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...projectLabelMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectLabelQueries.labels(),
      });
      openSuccessToast({ message: "라벨을 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "라벨을 생성하지 못했어요." });
    },
  });
};
