import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { labelQueries } from "../api/label.queries";
import { labelMutations } from "../api/label.mutations";

export const useCreateLabel = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...labelMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: labelQueries.labels(),
      });
      openSuccessToast({ message: "레이블을 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "레이블을 생성하지 못했어요." });
    },
  });
};
