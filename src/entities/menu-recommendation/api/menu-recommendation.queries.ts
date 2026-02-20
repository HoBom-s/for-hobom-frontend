import { queryOptions } from "@tanstack/react-query";
import {
  fetchMenuRecommendationList,
  fetchTodayRecommendedMenu,
} from "./menu-recommendation.api";

export const fetchMenuRecommendationListQueryOption = () =>
  queryOptions({
    queryKey: ["menu", "recommendation", "list"],
    queryFn: () => fetchMenuRecommendationList(),
  });

export const fetchSelectedTodayMenuQueryOption = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ["today", "selected-menu", id],
    queryFn: () => fetchTodayRecommendedMenu({ id }),
  });
