import {
  type AddMenuRecommendationInput,
  AddMenuRecommendationSchema,
  type TodayMenuCandidateInput,
  TodayMenuCandidateSchema,
} from "@/entities/menu-recommendation/model/menu-recommendation.model.ts";
import { validateWithZod } from "@/shared/lib";

export const validateTodayMenuInput = (
  input: unknown,
): TodayMenuCandidateInput | Error => {
  return validateWithZod(TodayMenuCandidateSchema)(input);
};

export const validateMenuRecommendationInput = (
  input: unknown,
): AddMenuRecommendationInput | Error => {
  return validateWithZod(AddMenuRecommendationSchema)(input);
};
