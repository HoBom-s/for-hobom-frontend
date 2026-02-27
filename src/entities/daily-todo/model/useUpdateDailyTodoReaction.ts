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

export const useUpdateDailyTodoReaction = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const queryClient = useQueryClient();
  const { openErrorToast } = useToast();

  return useMutation({
    ...todoMutations.changeReaction(),
    onSuccess: async () => {
      const date = Bom.pipe(getSelectedDate(query, now), formatDate);

      await queryClient.invalidateQueries({
        queryKey: todoQueries.byDate(date).queryKey,
      });
    },
    onError: () => {
      openErrorToast({ message: "리액션을 변경하지 못했어요." });
    },
  });
};
