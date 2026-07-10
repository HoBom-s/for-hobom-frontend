import { Bom } from "hobom-utils";
import type { CategoryType } from "../api/daily-todo-category.type";
import type { DailyTodoType, DailyTodoWithCategoryType } from "../api/daily-todo.type";

const toDailyTodoWithCategory = (
  category: CategoryType,
  todos: DailyTodoType[],
): DailyTodoWithCategoryType => ({
  categoryId: category.id,
  categoryTitle: category.title,
  categoryOwnerId: category.ownerId,
  todoItems: Bom.filter(todos, (todo) => todo.category.id === category.id),
});

export const createTodosWithCategory = (
  categories: CategoryType[],
  todos: DailyTodoType[],
): DailyTodoWithCategoryType[] => {
  return Bom.pipe(
    categories,
    Bom.map((category) => toDailyTodoWithCategory(category, todos)),
  );
};
