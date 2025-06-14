import type {
  FoodType,
  MenuKindType,
  TimeOfMealType,
} from "../model/menu-recommendation.model";

interface RegisterPersonType {
  id: string;
  username: string;
  nickname: string;
}

export interface MenuRecommendationType {
  id: string;
  name: string;
  menuKind: MenuKindType;
  timeOfMeal: TimeOfMealType;
  foodType: FoodType;
  registerPerson: RegisterPersonType;
}

export interface TodayMenuResponse {
  todayMenuId: string;
}

export interface TodayRecommendedMenuType {
  id: string;
  recommendationDate: string;
  recommendedMenu: MenuRecommendationType;
  candidates: MenuRecommendationType[];
}

export interface SelectedTodayMenuResponse {
  recommendedMenuId: string;
}
