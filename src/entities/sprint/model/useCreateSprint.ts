import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { sprintQueries } from "../api/sprint.queries";
import { sprintMutations } from "../api/sprint.mutations";

export const useCreateSprint = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...sprintMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: sprintQueries.sprints(),
      });
      openSuccessToast({ message: "스프린트를 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "스프린트를 생성하지 못했어요." });
    },
  });
};
