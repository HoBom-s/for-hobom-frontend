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
import { todoMutations } from "../api/daily-todo.mutations";

export const useCreateDailyTodo = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...todoMutations.create(),
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

      openSuccessToast({ message: "Daily TODO를 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "Daily TODO를 생성하지 못했어요." });
    },
  });
};
