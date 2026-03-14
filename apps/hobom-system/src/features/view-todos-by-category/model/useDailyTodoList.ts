import { useSuspenseQuery } from "@tanstack/react-query";
import { Bom } from "hobom-utils";
import {
  todoQueries,
  getNow,
  getSelectedDate,
  formatDate,
  createTodosWithCategory,
} from "@/entities/daily-todo";
import { useRouterQuery } from "@/shared/model";

export const useDailyTodoList = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const date = Bom.pipe(getSelectedDate(query, now), formatDate);
  const { data: categories } = useSuspenseQuery(todoQueries.categories());
  const { data: todos } = useSuspenseQuery(Bom.pipe(date, todoQueries.byDate));

  const todoItems = Bom.prop(todos, "items");
  const categoryItems = Bom.prop(categories, "items");
  const groupedTodosWithCategory = createTodosWithCategory(categoryItems, todoItems);

  return {
    todoItems,
    categories,
    groupedTodosWithCategory,
  };
};
