import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { boardQueries } from "../api/board.queries";
import { boardMutations } from "../api/board.mutations";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...boardMutations.update(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardQueries.boards(),
      });
      openSuccessToast({ message: "보드를 수정했어요." });
    },
    onError: () => {
      openErrorToast({ message: "보드를 수정하지 못했어요." });
    },
  });
};
