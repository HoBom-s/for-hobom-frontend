import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { todoQueries } from "@/entities/daily-todo";
import { categoryMutations } from "../api/daily-todo-category.mutations";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...categoryMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: todoQueries.categories().queryKey,
      });
      openSuccessToast({ message: "카테고리를 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "카테고리를 생성하지 못했어요." });
    },
  });
};
