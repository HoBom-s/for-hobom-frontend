import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { boardQueries } from "../api/board.queries";
import { boardMutations } from "../api/board.mutations";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...boardMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardQueries.boards(),
      });
      openSuccessToast({ message: "보드를 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "보드를 생성하지 못했어요." });
    },
  });
};
