import { useDataLot } from "hobom-data";
import { menuQueries } from "../api/menu-recommendation.queries";
import { fetchTodayRecommendedMenu } from "../api/menu-recommendation.api";
import { useTodayMenuId } from "./useTodayMenuIdContext";

export const useUpdateTodayMenuCache = () => {
  const { todayMenuId } = useTodayMenuId();
  const dataLot = useDataLot();

  return {
    updateCache: async () => {
      if (todayMenuId == null) return;
      const data = await fetchTodayRecommendedMenu({ id: todayMenuId });
      const key = menuQueries.selectedTodayMenu({ id: todayMenuId }).queryKey;

      dataLot.setQueryData(key, data);
    },
  };
};
