import { MenuKindModel, TimeOfMealModel, FoodTypeModel } from "./model/menu-recommendation.model";
import { postSelectTodayMenu } from "./api/menu-recommendation.api";
import { menuQueries } from "./api/menu-recommendation.queries";
import { useAddMenuRecommendation } from "./model/useAddMenuRecommendation";
import { useAddCandidatesTodayMenu } from "./model/useAddCandidatesTodayMenu";
import { useUpdateTodayMenuCache } from "./model/useUpdateTodayMenuCache";
import {
  validateTodayMenuInput,
  validateMenuRecommendationInput,
} from "./model/validate-menu-recommendation.model";
import { useTodayMenuId } from "./model/useTodayMenuIdContext";
import { TodayMenuIdContextProvider } from "./model/TodayMenuIdContextProvider";
import type { AddMenuRecommendationInput } from "./model/menu-recommendation.model";
import type { MenuRecommendationType } from "./api/menu-recommendation.type";

export {
  menuQueries,
  MenuKindModel,
  TimeOfMealModel,
  FoodTypeModel,
  useAddCandidatesTodayMenu,
  validateTodayMenuInput,
  validateMenuRecommendationInput,
  postSelectTodayMenu,
  useUpdateTodayMenuCache,
  useAddMenuRecommendation,
  useTodayMenuId,
  TodayMenuIdContextProvider,
};
export type { MenuRecommendationType, AddMenuRecommendationInput };
