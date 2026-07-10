import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import { todoQueries } from "../api/daily-todo.queries";
import { categoryMutations } from "../api/daily-todo-category.mutations";

export const useUpdateCategory = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...categoryMutations.update(),
    onSuccess: async () => {
      await dataLot.invalidateQueries({
        queryKey: todoQueries.categories().queryKey,
      });
      openSuccessToast({ message: "카테고리를 수정했어요." });
    },
    onError: () => {
      openErrorToast({ message: "카테고리를 수정하지 못했어요." });
    },
  });
};
