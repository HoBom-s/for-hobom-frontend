import type { DailyTodoType } from "@/features/daily-todo/api";
import { Bom } from "@/packages/bom";

export const splitTodosByCategory = (
  dailyTodoItems: DailyTodoType[],
): ReadonlyArray<DailyTodoType[]> => {
  const todosWithNoCategory: DailyTodoType[] = [];
  const todosWithCategory: DailyTodoType[] = [];

  Bom.forEach(dailyTodoItems, (item) =>
    Bom.isNullish(item.category)
      ? todosWithNoCategory.push(item)
      : todosWithCategory.push(item),
  );

  return [todosWithNoCategory, todosWithCategory] as const;
};

export const createGroupedTodosByCategoryId = (
  todosWithCategory: DailyTodoType[],
): Record<string, DailyTodoType[]> => {
  return Bom.groupBy(todosWithCategory, (todo) => todo.category.id);
};
