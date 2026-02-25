import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { useTodayMenuId } from "./useTodayMenuIdContext";
import { menuMutations } from "../api/menu-recommendation.mutations";

export const useAddCandidatesTodayMenu = (callback: () => void) => {
  const { openErrorToast } = useToast();
  const { setTodayMenuId } = useTodayMenuId();

  return useMutation({
    ...menuMutations.addCandidatesTodayMenu(),
    onSuccess: (data) => {
      setTodayMenuId(data.items.todayMenuId);
      callback();
    },
    onError: () => {
      openErrorToast({ message: "오류가 발생했어요." });
    },
  });
};
