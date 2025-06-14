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
