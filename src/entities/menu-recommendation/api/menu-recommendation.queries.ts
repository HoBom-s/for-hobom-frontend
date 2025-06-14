import { queryOptions } from "@tanstack/react-query";
import { fetchMenuRecommendationList } from "@/entities/menu-recommendation";

export const fetchMenuRecommendationListQueryOption = () =>
  queryOptions({
    queryKey: ["menu", "recommendation", "list"],
    queryFn: () => fetchMenuRecommendationList(),
  });
