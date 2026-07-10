import { useCallback, useEffect, useRef } from "react";
import { useMutation, useDataLot } from "hobom-data";
import { Bom } from "hobom-utils";
import { useToast, useRouterQuery } from "@/shared/model";
import type { HttpResponseType } from "@/shared/api";
import { todoQueries } from "../api/daily-todo.queries";
import { formatDate, getNow, getSelectedDate } from "../lib/calendar-date.lib";
import { todoMutations } from "../api/daily-todo.mutations";
import type { DailyTodoType } from "../api/daily-todo.type";

const UNDO_DELAY = 5_000;

export const useDeleteDailyTodo = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const dataLot = useDataLot();
  const { openUndoToast, openErrorToast } = useToast();

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rollbackRef = useRef<(() => void) | null>(null);

  const date = Bom.pipe(getSelectedDate(query, now), formatDate);
  const queryOption = todoQueries.byDate(date);
  const queryKey = queryOption.queryKey;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const apiDelete = useMutation({
    ...todoMutations.delete(),
    onSettled: async () => {
      await Promise.all([
        dataLot.invalidateQueries(todoQueries.categories()),
        dataLot.invalidateQueries(queryOption),
      ]);
    },
    onError: () => {
      rollbackRef.current?.();
      rollbackRef.current = null;
      openErrorToast({ message: "Daily TODO를 제거하지 못했어요." });
    },
  });

  const mutate = useCallback(
    ({ id }: { id: string }) => {
      const previousData = dataLot.getQueryData(queryKey);

      dataLot.setQueryData<HttpResponseType<DailyTodoType[]>>(queryKey, (old) => {
        if (!old) return;

        return {
          ...old,
          items: old.items.filter((item) => item.id !== id),
        };
      });

      if (timerRef.current) clearTimeout(timerRef.current);

      const undo = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = undefined;
        rollbackRef.current = null;
        if (previousData != null) {
          dataLot.setQueryData(queryKey, previousData);
        }
      };

      rollbackRef.current = undo;

      timerRef.current = setTimeout(() => {
        rollbackRef.current = null;
        apiDelete.mutate({ id });
      }, UNDO_DELAY);

      openUndoToast({
        message: "Daily TODO를 제거했어요.",
        onUndo: undo,
      });
    },
    [dataLot, queryKey, apiDelete, openUndoToast],
  );

  return { mutate, isPending: apiDelete.isPending };
};
