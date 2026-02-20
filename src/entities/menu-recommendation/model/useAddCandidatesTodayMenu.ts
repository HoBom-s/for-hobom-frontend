import { useMutation } from "@tanstack/react-query";
import { putMenuRecommendationTodayMenu } from "../api/menu-recommendation.api";
import { useTodayMenuId } from "./useTodayMenuIdContext";
import { useToast } from "@/shared/model";

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
