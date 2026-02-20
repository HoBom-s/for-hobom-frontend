import { fetchSelectedTodayMenuQueryOption } from "../api/menu-recommendation.queries";
import { fetchTodayRecommendedMenu } from "../api/menu-recommendation.api";
import { useTodayMenuId } from "./useTodayMenuIdContext";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateTodayMenuCache = () => {
  const { todayMenuId } = useTodayMenuId();
  const queryClient = useQueryClient();

  return {
    updateCache: async () => {
      if (todayMenuId == null) {
        return;
      }
      const data = await fetchTodayRecommendedMenu({ id: todayMenuId });
      const key = fetchSelectedTodayMenuQueryOption({
        id: todayMenuId,
      }).queryKey;
      queryClient.setQueryData(key, data);
    },
  };
};
