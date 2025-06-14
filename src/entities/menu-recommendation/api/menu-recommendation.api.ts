import { httpClient, type HttpResponseType } from "@/shared/http";
import type {
  MenuRecommendationType,
  TodayMenuResponse,
} from "./menu-recommendation.type";
import type { TodayMenuCandidateInput } from "../model/menu-recommendation.model";

export const fetchMenuRecommendationList = async () => {
  return await httpClient.get<HttpResponseType<MenuRecommendationType[]>>(
    "/menu-recommendation",
  );
};

export const putMenuRecommendationTodayMenu = async ({
  candidates,
  recommendedMenu,
  recommendationDate,
  todayMenuId,
}: TodayMenuCandidateInput) => {
  return await httpClient.put<HttpResponseType<TodayMenuResponse>>(
    "/today-menu",
    {
      candidates,
      recommendedMenu,
      recommendationDate,
      todayMenuId,
    },
  );
};
