import { useMutation, useDataLot } from "hobom-data";
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
  const dataLot = useDataLot();
  const { openErrorToast } = useToast();

  const date = Bom.pipe(getSelectedDate(query, now), formatDate);
  const queryOption = todoQueries.byDate(date);
  const queryKey = queryOption.queryKey;

  return useMutation({
    ...todoMutations.changeReaction(),
    onMutate: async ({ id, reaction, reactionUserId }) => {
      await dataLot.cancelQueries(queryOption);
      const previousData = dataLot.getQueryData(queryKey);

      dataLot.setQueryData<HttpResponseType<DailyTodoType[]>>(queryKey, (old) => {
        if (old == null) return;
        const items = old.items;

        if (!Array.isArray(items)) return;

        return {
          ...old,
          items: items.map((item) =>
            item.id === id ? { ...item, reaction: { value: reaction, reactionUserId } } : item,
          ),
        };
      });

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData != null) {
        dataLot.setQueryData(queryKey, context.previousData);
      }
      openErrorToast({ message: "리액션을 변경하지 못했어요." });
    },
    onSettled: async () => {
      await dataLot.invalidateQueries(queryOption);
    },
  });
};
