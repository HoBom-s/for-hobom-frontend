import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { futureMessageQueries } from "@/entities/future-message";
import { futureMessageMutations } from "../api/future-message.mutations";

export const useDeleteFutureMessage = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...futureMessageMutations.delete(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: futureMessageQueries.futureMessages(),
      });
      openSuccessToast({ message: "메시지를 삭제했어요." });
    },
    onError: () => {
      openErrorToast({ message: "메시지를 삭제하지 못했어요." });
    },
  });
};
