import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDailyTodoCategoriesOption,
  fetchDailyTodosByDateQueryOption,
  formatDate,
  getNow,
  getSelectedDate,
  postDailyTodoCreate,
} from "@/entities/daily-todo";
import { useToast } from "@/shared/toast";
import { Bom } from "@/packages/bom";
import { useRouterQuery } from "@/shared/router/model";

export const useCreateDailyTodo = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    mutationFn: postDailyTodoCreate,
    onSuccess: async () => {
      const date = Bom.pipe(getSelectedDate(query, now), formatDate);
      const key = fetchDailyTodosByDateQueryOption(date).queryKey;

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: fetchDailyTodoCategoriesOption().queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: key }),
      ]);

      openSuccessToast({ message: "Successfully created !" });
    },
    onError: () => {
      openErrorToast({ message: "Cannot create daily todo item !" });
    },
  });
};
