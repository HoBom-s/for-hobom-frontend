import {
  fetchSelectedTodayMenuQueryOption,
  fetchTodayRecommendedMenu,
  getTodayMenuId,
} from "@/entities/menu-recommendation";
import { useQueryClient } from "@tanstack/react-query";
import { useRouterQuery } from "@/shared/router/model";

export const useUpdateTodayMenuCache = () => {
  const { query } = useRouterQuery();
  const queryClient = useQueryClient();

  return {
    updateCache: async () => {
      const id = getTodayMenuId(query);
      if (id == null) {
        return;
      }
      const data = await fetchTodayRecommendedMenu({ id });
      const key = fetchSelectedTodayMenuQueryOption({ id }).queryKey;
      queryClient.setQueryData(key, data);
    },
  };
};
