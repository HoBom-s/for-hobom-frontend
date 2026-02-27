import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { useRouterQuery } from "@/shared/model";
import { Bom } from "@/packages/bom";
import {
  todoQueries,
  formatDate,
  getNow,
  getSelectedDate,
} from "@/entities/daily-todo";
import { categoryMutations } from "../api/daily-todo-category.mutations";

export const useDeleteCategory = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...categoryMutations.delete(),
    onSuccess: async () => {
      const date = Bom.pipe(getSelectedDate(query, now), formatDate);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: todoQueries.categories().queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: todoQueries.byDate(date).queryKey,
        }),
      ]);
      openSuccessToast({ message: "카테고리를 삭제했어요." });
    },
    onError: () => {
      openErrorToast({ message: "카테고리를 삭제하지 못했어요." });
    },
  });
};
