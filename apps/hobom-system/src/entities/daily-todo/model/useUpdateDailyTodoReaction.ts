import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bom } from "hobom-utils";
import { useToast, useRouterQuery } from "@/shared/model";
import type { HttpResponseType } from "@/shared/api";
import {
  type DailyTodoType,
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

  const date = Bom.pipe(getSelectedDate(query, now), formatDate);
  const queryOption = todoQueries.byDate(date);
  const queryKey = queryOption.queryKey;

  return useMutation({
    ...todoMutations.changeReaction(),
    onMutate: async ({ id, reaction, reactionUserId }) => {
      await queryClient.cancelQueries(queryOption);
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<HttpResponseType<DailyTodoType[]>>(
        queryKey,
        (old) => {
          if (old == null) return;
          const items = old.items;

          if (!Array.isArray(items)) return;

          return {
            ...old,
            items: items.map((item) =>
              item.id === id
                ? { ...item, reaction: { value: reaction, reactionUserId } }
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
      openErrorToast({ message: "리액션을 변경하지 못했어요." });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(queryOption);
    },
  });
};
