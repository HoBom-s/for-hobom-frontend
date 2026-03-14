import { z } from "zod";

const enumValues = <T extends Record<string, string>>(obj: T) =>
  Object.values(obj) as [T[keyof T], ...T[keyof T][]];

export const MenuKindModel = {
  KOREAN: "KOREAN",
  JAPANESE: "JAPANESE",
  CHINESE: "CHINESE",
  INDIAN: "INDIAN",
  MEXICAN: "MEXICAN",
  AMERICAN: "AMERICAN",
  ITALIAN: "ITALIAN",
} as const;

export const TimeOfMealModel = {
  BREAKFAST: "BREAKFAST",
  LUNCH: "LUNCH",
  DINNER: "DINNER",
} as const;

export const FoodTypeModel = {
  MEAL: "MEAL",
  DESERT: "DESERT",
  BOTH: "BOTH",
} as const;

export type MenuKindType = keyof typeof MenuKindModel;
export type TimeOfMealType = keyof typeof TimeOfMealModel;
export type FoodType = keyof typeof FoodTypeModel;

export const TodayMenuCandidateSchema = z.object({
  candidates: z.array(z.string().min(1)),
  recommendationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  recommendedMenu: z.string().optional(),
  todayMenuId: z.string().optional(),
});
export type TodayMenuCandidateInput = z.infer<typeof TodayMenuCandidateSchema>;

export const AddMenuRecommendationSchema = z.object({
  name: z.string().min(1),
  menuKind: z.enum(enumValues(MenuKindModel)),
  timeOfMeal: z.enum(enumValues(TimeOfMealModel)),
  foodType: z.enum(enumValues(FoodTypeModel)),
});
export type AddMenuRecommendationInput = z.infer<typeof AddMenuRecommendationSchema>;
