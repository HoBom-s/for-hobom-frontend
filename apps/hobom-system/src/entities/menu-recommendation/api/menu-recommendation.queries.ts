import { queryOptions } from "@tanstack/react-query";
import { fetchMenuRecommendationList, fetchTodayRecommendedMenu } from "./menu-recommendation.api";

export const menuQueries = {
  menus: () => ["menus"],

  recommendationList: () =>
    queryOptions({
      queryKey: ["menus", "recommendation", "list"],
      queryFn: () => fetchMenuRecommendationList(),
    }),

  selectedTodayMenu: ({ id }: { id: string }) =>
    queryOptions({
      queryKey: ["menus", "today", "selected-menu", id],
      queryFn: () => fetchTodayRecommendedMenu({ id }),
    }),
} as const;
