import { mutationOptions } from "hobom-data";
import {
  postMenuRecommendation,
  putMenuRecommendationTodayMenu,
} from "../api/menu-recommendation.api";

export const menuMutations = {
  menus: () => ["menus"] as const,

  addRecommendation: () =>
    mutationOptions({
      mutationKey: [...menuMutations.menus(), "addRecommendation"] as const,
      mutationFn: postMenuRecommendation,
    }),
  addCandidatesTodayMenu: () =>
    mutationOptions({
      mutationKey: [...menuMutations.menus(), "addCandidatesTodayMenu"] as const,
      mutationFn: putMenuRecommendationTodayMenu,
    }),
} as const;
