import { DailyTodoCompleteStatusModel } from "../model/daily-todo-complete-status.model";
import { DailyTodoCycleModel } from "../model/daily-todo-cycle.model";

export type ProgressType = keyof typeof DailyTodoCompleteStatusModel;
export type CycleType = keyof typeof DailyTodoCycleModel;

interface OwnerType {
  id: string;
  username: string;
  nickname: string;
}

interface CategoryType {
  id: string;
  title: string;
  ownerId: string;
}

export interface DailyTodoType {
  id: string;
  title: string;
  date: string;
  reaction: string | null;
  progress: ProgressType;
  cycle: CycleType;
  owner: OwnerType;
  category: CategoryType;
}

export interface DailyTodoWithCategoryType {
  categoryId: string;
  categoryTitle: string;
  categoryOwnerId: string;
  todoItems: DailyTodoType[];
}
