import { httpClient, parseResponse, type HttpResponseType } from "@/shared/api";
import { menuRecommendationListSchema, todayRecommendedMenuSchema } from "./menu-recommendation.schema";
import type {
  MenuRecommendationType,
  SelectedTodayMenuResponse,
  TodayMenuResponse,
  TodayRecommendedMenuType,
} from "./menu-recommendation.type";
import type {
  AddMenuRecommendationInput,
  TodayMenuCandidateInput,
} from "../model/menu-recommendation.model";

export const fetchMenuRecommendationList = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<MenuRecommendationType[]>>(
    "/menu-recommendation",
    { signal },
  );

  return {
    ...res,
    items: parseResponse(menuRecommendationListSchema, "GET /menu-recommendation")(res.items),
  };
};

export const postMenuRecommendation = async ({
  name,
  menuKind,
  timeOfMeal,
  foodType,
}: AddMenuRecommendationInput) => {
  return await httpClient.post("/menu-recommendation", {
    name,
    menuKind,
    timeOfMeal,
    foodType,
  });
};

export const putMenuRecommendationTodayMenu = async ({
  candidates,
  recommendedMenu,
  recommendationDate,
  todayMenuId,
}: TodayMenuCandidateInput) => {
  return await httpClient.put<HttpResponseType<TodayMenuResponse>>("/today-menu", {
    candidates,
    recommendedMenu,
    recommendationDate,
    todayMenuId,
  });
};

export const fetchTodayRecommendedMenu = async ({ id }: { id: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<TodayRecommendedMenuType>>(
    `/today-menu/${id}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(todayRecommendedMenuSchema, "GET /today-menu/:id")(res.items),
  };
};

export const postSelectTodayMenu = async ({ id }: { id: string }) => {
  return await httpClient.post<HttpResponseType<SelectedTodayMenuResponse>>(`/today-menu/pick`, {
    todayMenuId: id,
  });
};
