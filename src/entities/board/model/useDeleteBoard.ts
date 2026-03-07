import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { boardQueries } from "../api/board.queries";
import { boardMutations } from "../api/board.mutations";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...boardMutations.delete(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardQueries.boards(),
      });
      openSuccessToast({ message: "보드를 삭제했어요." });
    },
    onError: () => {
      openErrorToast({ message: "보드를 삭제하지 못했어요." });
    },
  });
};
