import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { todoQueries } from "@/entities/daily-todo";
import { categoryMutations } from "../api/daily-todo-category.mutations";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...categoryMutations.update(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: todoQueries.categories().queryKey,
      });
      openSuccessToast({ message: "카테고리를 수정했어요." });
    },
    onError: () => {
      openErrorToast({ message: "카테고리를 수정하지 못했어요." });
    },
  });
};
