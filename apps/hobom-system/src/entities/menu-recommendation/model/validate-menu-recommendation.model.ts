import { validateWithSchema } from "@/shared/lib";
import {
  type AddMenuRecommendationInput,
  AddMenuRecommendationSchema,
  type TodayMenuCandidateInput,
  TodayMenuCandidateSchema,
} from "./menu-recommendation.model";

export const validateTodayMenuInput = (input: unknown): TodayMenuCandidateInput | Error => {
  return validateWithSchema(TodayMenuCandidateSchema)(input);
};

export const validateMenuRecommendationInput = (
  input: unknown,
): AddMenuRecommendationInput | Error => {
  return validateWithSchema(AddMenuRecommendationSchema)(input);
};
