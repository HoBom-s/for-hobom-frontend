import {
  type TodayMenuCandidateInput,
  TodayMenuCandidateSchema,
} from "@/entities/menu-recommendation/model/menu-recommendation.model.ts";
import { validateWithZod } from "@/shared/assert";

export const validateTodayMenuInput = (
  input: unknown,
): TodayMenuCandidateInput | Error => {
  return validateWithZod(TodayMenuCandidateSchema)(input);
};
