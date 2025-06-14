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
