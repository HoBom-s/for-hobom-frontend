import { useMutation } from "@tanstack/react-query";
import {
  putMenuRecommendationTodayMenu,
  useTodayMenuId,
} from "@/entities/menu-recommendation";
import { useToast } from "@/shared/toast";

export const useAddCandidatesTodayMenu = (callback: () => void) => {
  const { openErrorToast } = useToast();
  const { setTodayMenuId } = useTodayMenuId();

  return useMutation({
    mutationFn: putMenuRecommendationTodayMenu,
    onSuccess: (data) => {
      setTodayMenuId(data.items.todayMenuId);
      callback();
    },
    onError: () => {
      openErrorToast({ message: "오류가 발생했어요." });
    },
  });
};
