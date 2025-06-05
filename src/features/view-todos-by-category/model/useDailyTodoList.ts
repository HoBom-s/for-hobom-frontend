import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchDailyTodosByDateQueryOption,
  getNow,
  getSelectedDate,
  formatDate,
  fetchDailyTodoCategoriesOption,
  createTodosWithCategory,
} from "@/entities/daily-todo";
import { useRouterQuery } from "@/shared/router/model";
import { Bom } from "@/packages/bom";

export const useDailyTodoList = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const date = Bom.pipe(getSelectedDate(query, now), formatDate);
  const { data: categories } = useSuspenseQuery(
    fetchDailyTodoCategoriesOption(),
  );
  const { data: todos } = useSuspenseQuery(
    Bom.pipe(date, fetchDailyTodosByDateQueryOption),
  );

  const todoItems = Bom.prop(todos, "items");
  const categoryItems = Bom.prop(categories, "items");
  const groupedTodosWithCategory = createTodosWithCategory(
    categoryItems,
    todoItems,
  );

  return {
    todoItems,
    categories,
    groupedTodosWithCategory,
  };
};
