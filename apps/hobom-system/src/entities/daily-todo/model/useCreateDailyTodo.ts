import { useMutation, useDataLot } from "hobom-data";
import { Bom } from "hobom-utils";
import { useToast, useRouterQuery } from "@/shared/model";
import { todoQueries } from "../api/daily-todo.queries";
import { formatDate, getNow, getSelectedDate } from "../lib/calendar-date.lib";
import { todoMutations } from "../api/daily-todo.mutations";

export const useCreateDailyTodo = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...todoMutations.create(),
    onSuccess: async () => {
      const date = Bom.pipe(getSelectedDate(query, now), formatDate);

      await Promise.all([
        dataLot.invalidateQueries({
          queryKey: todoQueries.categories().queryKey,
        }),
        dataLot.invalidateQueries({
          queryKey: todoQueries.byDate(date).queryKey,
        }),
      ]);

      openSuccessToast({ message: "Daily TODO를 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "Daily TODO를 생성하지 못했어요." });
    },
  });
};
