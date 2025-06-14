import { httpClient, type HttpResponseType } from "@/shared/http";
import type { MenuRecommendationType } from "./menu-recommendation.type";

export const fetchMenuRecommendationList = async () => {
  return await httpClient.get<HttpResponseType<MenuRecommendationType[]>>(
    "/menu-recommendation",
  );
};
