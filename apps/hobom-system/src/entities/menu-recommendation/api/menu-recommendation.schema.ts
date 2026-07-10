import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { MenuRecommendationType, TodayRecommendedMenuType } from "./menu-recommendation.type";

/** `MenuRecommendationType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const menuRecommendationSchema: Schema<MenuRecommendationType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  name: HoBomSchema.string(),
  menuKind: HoBomSchema.enum([
    "KOREAN",
    "JAPANESE",
    "CHINESE",
    "INDIAN",
    "MEXICAN",
    "AMERICAN",
    "ITALIAN",
  ]),
  timeOfMeal: HoBomSchema.enum(["BREAKFAST", "LUNCH", "DINNER"]),
  foodType: HoBomSchema.enum(["MEAL", "DESERT", "BOTH"]),
  registerPerson: HoBomSchema.object({
    id: HoBomSchema.string(),
    username: HoBomSchema.string(),
    nickname: HoBomSchema.string(),
  }),
});

export const menuRecommendationListSchema: Schema<MenuRecommendationType[]> =
  HoBomSchema.array(menuRecommendationSchema);

export const todayRecommendedMenuSchema: Schema<TodayRecommendedMenuType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  recommendationDate: HoBomSchema.date(),
  recommendedMenu: menuRecommendationSchema,
  candidates: HoBomSchema.array(menuRecommendationSchema),
});
