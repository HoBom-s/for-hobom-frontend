import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import { todoQueries } from "../api/daily-todo.queries";
import { categoryMutations } from "../api/daily-todo-category.mutations";

export const useCreateCategory = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...categoryMutations.create(),
    onSuccess: async () => {
      await dataLot.invalidateQueries({
        queryKey: todoQueries.categories().queryKey,
      });
      openSuccessToast({ message: "카테고리를 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "카테고리를 생성하지 못했어요." });
    },
  });
};
