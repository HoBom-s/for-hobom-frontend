import { useToast } from "@/shared/toast/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type DailyTodoType,
  fetchDailyTodosByDateQueryOption,
  patchDailyTodoCompleteStatusChange,
} from "@/features/daily-todo/api";
import {
  normalizeTodoDateToUtcMidnight,
  formatDate,
} from "@/features/daily-todo/lib";
import { Bom } from "@/packages/bom";
import { changeCompleteStatus } from "@/features/daily-todo/model/daily-todo-complete-status.model.ts";
import type { HttpResponseType } from "@/shared/http/api";

/**
 * `useChangeDailyTodoCompleteStatus.ts`
 * Update item's complete status by optimistic update
 *
 * @param {string} dailyTodoItemDate
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
    fetchDailyTodosByDateQueryOption,
  );
  const queryKey = Bom.prop(queryOption, "queryKey");

  return useMutation({
    mutationFn: patchDailyTodoCompleteStatusChange,
    onMutate: async ({ status }) => {
      await queryClient.cancelQueries(queryOption);
      // get old data for rollback.
      const previousData = queryClient.getQueryData(queryKey);

      // set new data for client state
      queryClient.setQueryData<HttpResponseType<DailyTodoType[]>>(
        queryKey,
        (old) => {
          if (old == null) {
            return;
          }

          const items = Bom.prop(old, "items");
          if (!Array.isArray(items)) {
            return;
          }

          const foundItem = items.find((item) => item.id === dailyTodoItem.id);
          if (Bom.isNullish(foundItem)) {
            return;
          }

          return {
            ...old,
            items: items.map((item) =>
              item.id === foundItem.id
                ? { ...foundItem, status: changeCompleteStatus(status) }
                : item,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      // rollback data
      if (context?.previousData != null) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      openErrorToast({ message: "Failed to change status." });
    },
    onSuccess: () => {
      openSuccessToast({ message: "Status changed successfully." });
    },
    onSettled: async () => {
      // clean up data regardless of success or failure
      await queryClient.invalidateQueries(queryOption);
    },
  });
};
