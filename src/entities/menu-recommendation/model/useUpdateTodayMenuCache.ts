import {
  fetchSelectedTodayMenuQueryOption,
  fetchTodayRecommendedMenu,
  useTodayMenuId,
} from "@/entities/menu-recommendation";
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
