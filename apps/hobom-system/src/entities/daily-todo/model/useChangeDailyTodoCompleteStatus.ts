import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bom } from "hobom-utils";
import { useToast } from "@/shared/model";
import type { HttpResponseType } from "@/shared/api";
import {
  type DailyTodoType,
  todoQueries,
  normalizeTodoDateToUtcMidnight,
  formatDate,
} from "@/entities/daily-todo";
import { todoMutations } from "../api/daily-todo.mutations";

/**
 * Update item's complete status by optimistic update
 */
export const useChangeDailyTodoCompleteStatus = (
  dailyTodoItem: DailyTodoType,
) => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  const queryOption = Bom.pipe(
    Bom.prop(dailyTodoItem, "date"),
    normalizeTodoDateToUtcMidnight,
    formatDate,
    todoQueries.byDate,
  );
  const queryKey = Bom.prop(queryOption, "queryKey");

  return useMutation({
    ...todoMutations.changeCompleteStatus(),
    onMutate: async ({ status }) => {
      await queryClient.cancelQueries(queryOption);
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<HttpResponseType<DailyTodoType[]>>(
        queryKey,
        (old) => {
          if (old == null) return;

          const items = Bom.prop(old, "items");

          if (!Array.isArray(items)) return;

          const foundItem = items.find((item) => item.id === dailyTodoItem.id);

          if (Bom.isNullish(foundItem)) return;

          return {
            ...old,
            items: items.map((item) =>
              item.id === foundItem.id
                ? { ...foundItem, progress: status }
                : item,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData != null) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      openErrorToast({ message: "상태를 변경하지 못했어요." });
    },
    onSuccess: () => {
      openSuccessToast({ message: "상태를 변경했어요." });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(queryOption);
    },
  });
};
