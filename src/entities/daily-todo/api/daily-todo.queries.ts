import { queryOptions } from "@tanstack/react-query";
import { fetchDailyTodos, fetchDailyTodosByDate } from "./daily-todo.api";
import { fetchDailyTodoCategories } from "./daily-todo-category.api";

export const todoQueries = {
  todos: () => ["todos"],

  list: (date: string) =>
    queryOptions({
      queryKey: ["todos", date],
      queryFn: () => fetchDailyTodos({ date }),
    }),

  byDate: (date: string) =>
    queryOptions({
      queryKey: ["todos", "by-date", date],
      queryFn: () => fetchDailyTodosByDate({ date }),
    }),

  categories: () =>
    queryOptions({
      queryKey: ["todos", "categories"],
      queryFn: () => fetchDailyTodoCategories(),
    }),
} as const;
