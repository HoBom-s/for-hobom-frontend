import { useMutation } from "@tanstack/react-query";
import { putMenuRecommendationTodayMenu } from "@/entities/menu-recommendation";
import { useToast } from "@/shared/toast";
import { useRouterQuery } from "@/shared/router/model";

export const useAddCandidatesTodayMenu = (callback: () => void) => {
  const { openErrorToast } = useToast();
  const { updateQuery } = useRouterQuery();

  return useMutation({
    mutationFn: putMenuRecommendationTodayMenu,
    onSuccess: (data) => {
      callback();
      updateQuery(
        {
          todayMenuId: data.items.todayMenuId,
        },
        {
          replace: true,
        },
      );
    },
    onError: () => {
      openErrorToast({ message: "Something went wrong!" });
    },
  });
};
