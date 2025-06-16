import {
  MenuKindModel,
  TimeOfMealModel,
  FoodTypeModel,
} from "./model/menu-recommendation.model";
import {
  fetchMenuRecommendationList,
  putMenuRecommendationTodayMenu,
  fetchTodayRecommendedMenu,
  postSelectTodayMenu,
  postMenuRecommendation,
} from "./api/menu-recommendation.api";
import {
  fetchMenuRecommendationListQueryOption,
  fetchTodayRecommendedMenuQueryOption,
  fetchSelectedTodayMenuQueryOption,
} from "./api/menu-recommendation.queries";
import { useSelectTodayMenu } from "./model/useSelectTodayMenu";
import type {
  MenuKindType,
  TimeOfMealType,
  FoodType,
} from "./model/menu-recommendation.model";
import { useAddCandidatesTodayMenu } from "./model/useAddCandidatesTodayMenu";
import type { AddMenuRecommendationInput } from "./model/menu-recommendation.model";
import { useUpdateTodayMenuCache } from "./model/useUpdateTodayMenuCache";
import { useAddMenuRecommendation } from "./model/useAddMenuRecommendation";
import {
  validateTodayMenuInput,
  validateMenuRecommendationInput,
} from "./model/validate-menu-recommendation.model";
import { MenuRecommendationListItem } from "./ui/MenuRecommendationListItem";
import {
  useTodayMenuId,
  TodayMenuIdContextProvider,
} from "./model/useTodayMenuIdContext";
import type {
  MenuRecommendationType,
  TodayMenuResponse,
  TodayRecommendedMenuType,
  SelectedTodayMenuResponse,
} from "./api/menu-recommendation.type";

export {
  MenuKindModel,
  TimeOfMealModel,
  FoodTypeModel,
  fetchMenuRecommendationList,
  postMenuRecommendation,
  putMenuRecommendationTodayMenu,
  fetchTodayRecommendedMenu,
  fetchMenuRecommendationListQueryOption,
  fetchTodayRecommendedMenuQueryOption,
  MenuRecommendationListItem,
  useAddCandidatesTodayMenu,
  validateTodayMenuInput,
  validateMenuRecommendationInput,
  postSelectTodayMenu,
  fetchSelectedTodayMenuQueryOption,
  useSelectTodayMenu,
  useUpdateTodayMenuCache,
  useAddMenuRecommendation,
  useTodayMenuId,
  TodayMenuIdContextProvider,
};
export type {
  MenuKindType,
  TimeOfMealType,
  FoodType,
  MenuRecommendationType,
  TodayMenuResponse,
  TodayRecommendedMenuType,
  SelectedTodayMenuResponse,
  AddMenuRecommendationInput,
};
