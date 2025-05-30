import type { DailyTodoCompleteStatusModel } from "@/features/daily-todo/model";

interface OwnerType {
  id: string;
  username: string;
  nickname: string;
}

interface CategoryType {
  id: string;
  title: string;
}

export interface DailyTodoType {
  id: string;
  title: string;
  date: Date;
  reaction: string | null;
  progress: DailyTodoCompleteStatusModel;
  owner: OwnerType;
  category: CategoryType;
}
