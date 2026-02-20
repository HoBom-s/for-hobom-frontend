import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteDailyTodoById,
  fetchDailyTodoCategoriesOption,
  fetchDailyTodosByDateQueryOption,
  formatDate,
  getNow,
  getSelectedDate,
} from "@/entities/daily-todo";
import { useToast } from "@/shared/model";
import { Bom } from "@/packages/bom";
import { useRouterQuery } from "@/shared/model";

export const useDeleteDailyTodo = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    mutationFn: deleteDailyTodoById,
    onSuccess: async () => {
      const date = Bom.pipe(getSelectedDate(query, now), formatDate);
      await Promise.all([
        queryClient.invalidateQueries(fetchDailyTodoCategoriesOption()),
        queryClient.invalidateQueries(fetchDailyTodosByDateQueryOption(date)),
      ]);
      openSuccessToast({ message: "Daily TODO를 제거했어요." });
    },
    onError: () => {
      openErrorToast({ message: "Daily TODO를 제거하지 못했어요." });
    },
  });
};
