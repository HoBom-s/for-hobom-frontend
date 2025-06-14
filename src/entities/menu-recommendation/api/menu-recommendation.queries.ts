import { queryOptions } from "@tanstack/react-query";
import { fetchMenuRecommendationList } from "@/entities/menu-recommendation";
import { fetchTodayRecommendedMenu } from "@/entities/menu-recommendation/api/menu-recommendation.api.ts";

export const fetchMenuRecommendationListQueryOption = () =>
  queryOptions({
    queryKey: ["menu", "recommendation", "list"],
    queryFn: () => fetchMenuRecommendationList(),
  });

export const fetchTodayRecommendedMenuQueryOption = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ["today", "recommendation", "menu", id],
    queryFn: () => fetchTodayRecommendedMenu({ id }),
  });

export const fetchSelectedTodayMenuQueryOption = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ["today", "selected-menu", id],
    queryFn: () => fetchTodayRecommendedMenu({ id }),
  });
