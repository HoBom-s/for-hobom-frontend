import { queryOptions } from "hobom-data";
import { fetchMenuRecommendationList, fetchTodayRecommendedMenu } from "./menu-recommendation.api";

export const menuQueries = {
  menus: () => ["menus"],

  recommendationList: () =>
    queryOptions({
      queryKey: ["menus", "recommendation", "list"],
      queryFn: ({ signal }) => fetchMenuRecommendationList(signal),
    }),

  selectedTodayMenu: ({ id }: { id: string }) =>
    queryOptions({
      queryKey: ["menus", "today", "selected-menu", id],
      queryFn: ({ signal }) => fetchTodayRecommendedMenu({ id }, signal),
    }),
} as const;
