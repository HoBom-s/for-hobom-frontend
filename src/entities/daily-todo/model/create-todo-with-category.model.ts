import type {
  CategoryType,
  DailyTodoType,
  DailyTodoWithCategoryType,
} from "@/entities/daily-todo";
import { Bom } from "@/packages/bom";

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
