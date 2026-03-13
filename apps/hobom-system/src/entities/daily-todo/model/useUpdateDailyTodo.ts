import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bom } from "hobom-utils";
import { useToast, useRouterQuery } from "@/shared/model";
import {
  todoQueries,
  formatDate,
  getNow,
  getSelectedDate,
} from "@/entities/daily-todo";
import { todoMutations } from "../api/daily-todo.mutations";

export const useUpdateDailyTodo = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...todoMutations.update(),
    onSuccess: async () => {
      const date = Bom.pipe(getSelectedDate(query, now), formatDate);

      await queryClient.invalidateQueries({
        queryKey: todoQueries.byDate(date).queryKey,
      });

      openSuccessToast({ message: "할 일을 수정했어요." });
    },
    onError: () => {
      openErrorToast({ message: "할 일을 수정하지 못했어요." });
    },
  });
};
