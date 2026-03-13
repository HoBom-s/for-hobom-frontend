import type { DailyTodoCompleteStatusModel } from "../model/daily-todo-complete-status.model";
import type { DailyTodoCycleModel } from "../model/daily-todo-cycle.model";

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

interface ReactionType {
  value: string;
  reactionUserId: string;
}

export interface DailyTodoType {
  id: string;
  title: string;
  date: string;
  reaction: ReactionType | null;
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
