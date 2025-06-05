import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteDailyTodoById,
  fetchDailyTodoCategoriesOption,
  fetchDailyTodosByDateQueryOption,
  formatDate,
  getNow,
  getSelectedDate,
} from "@/entities/daily-todo";
import { useToast } from "@/shared/toast";
import { Bom } from "@/packages/bom";
import { useRouterQuery } from "@/shared/router/model";

export const useDeleteDailyTodo = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    mutationFn: deleteDailyTodoById,
    onSuccess: () => {
      const date = Bom.pipe(getSelectedDate(query, now), formatDate);
      Bom.pipe(date, (date) => {
        Promise.all([
          queryClient.invalidateQueries(fetchDailyTodoCategoriesOption()),
          queryClient.invalidateQueries(
            Bom.pipe(date, fetchDailyTodosByDateQueryOption),
          ),
        ]).then(() => openSuccessToast({ message: "Successfully deleted !" }));
      });
    },
    onError: () => {
      openErrorToast({ message: "Cannot delete daily todo item !" });
    },
  });
};
