import { validateWithZod } from "@/shared/lib";
import {
  type AddMenuRecommendationInput,
  AddMenuRecommendationSchema,
  type TodayMenuCandidateInput,
  TodayMenuCandidateSchema,
} from "./menu-recommendation.model";

export const validateTodayMenuInput = (input: unknown): TodayMenuCandidateInput | Error => {
  return validateWithZod(TodayMenuCandidateSchema)(input);
};

export const validateMenuRecommendationInput = (
  input: unknown,
): AddMenuRecommendationInput | Error => {
  return validateWithZod(AddMenuRecommendationSchema)(input);
};
