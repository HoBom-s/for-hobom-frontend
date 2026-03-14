import { useMutation, useDataLot } from "hobom-data";
import { Bom } from "hobom-utils";
import { useToast, useRouterQuery } from "@/shared/model";
import { todoQueries, formatDate, getNow, getSelectedDate } from "@/entities/daily-todo";
import { categoryMutations } from "../api/daily-todo-category.mutations";

export const useDeleteCategory = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...categoryMutations.delete(),
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
      openSuccessToast({ message: "카테고리를 삭제했어요." });
    },
    onError: () => {
      openErrorToast({ message: "카테고리를 삭제하지 못했어요." });
    },
  });
};
