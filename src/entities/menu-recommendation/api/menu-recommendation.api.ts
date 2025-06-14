import { httpClient, type HttpResponseType } from "@/shared/http";
import type {
  MenuRecommendationType,
  SelectedTodayMenuResponse,
  TodayMenuResponse,
  TodayRecommendedMenuType,
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

export const fetchTodayRecommendedMenu = async ({ id }: { id: string }) => {
  return await httpClient.get<HttpResponseType<TodayRecommendedMenuType>>(
    `/today-menu/${id}`,
  );
};

export const postSelectTodayMenu = async ({ id }: { id: string }) => {
  return await httpClient.post<HttpResponseType<SelectedTodayMenuResponse>>(
    `/today-menu/pick`,
    {
      todayMenuId: id,
    },
  );
};
