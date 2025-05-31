import {
  DailyTodoCompleteStatusModel,
  DailyTodoCycleModel,
} from "@/features/daily-todo/model";

type ProgressType = keyof typeof DailyTodoCompleteStatusModel;
type CycleType = keyof typeof DailyTodoCycleModel;

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
  date: string;
  reaction: string | null;
  progress: ProgressType;
  cycle: CycleType;
  owner: OwnerType;
  category: CategoryType;
}
