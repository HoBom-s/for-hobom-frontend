import { HoBomSchema, type Infer } from "hobom-schema";

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

const enumValues = <T extends Record<string, string>>(obj: T) =>
  Object.values(obj) as [T[keyof T], ...T[keyof T][]];

export const TodayMenuCandidateSchema = HoBomSchema.object({
  candidates: HoBomSchema.array(HoBomSchema.string().min(1)),
  recommendationDate: HoBomSchema.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  recommendedMenu: HoBomSchema.string().optional(),
  todayMenuId: HoBomSchema.string().optional(),
});
export type TodayMenuCandidateInput = Infer<typeof TodayMenuCandidateSchema>;

export const AddMenuRecommendationSchema = HoBomSchema.object({
  name: HoBomSchema.string().min(1),
  menuKind: HoBomSchema.enum(enumValues(MenuKindModel)),
  timeOfMeal: HoBomSchema.enum(enumValues(TimeOfMealModel)),
  foodType: HoBomSchema.enum(enumValues(FoodTypeModel)),
});
export type AddMenuRecommendationInput = Infer<typeof AddMenuRecommendationSchema>;
