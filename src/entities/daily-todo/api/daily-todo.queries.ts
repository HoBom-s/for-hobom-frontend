import { queryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchDailyTodos, fetchDailyTodosByDate } from "./daily-todo.api";
import { fetchDailyTodoCategories } from "./daily-todo-category.api";

export const todoQueries = {
  todos: () => ["todos"],

  list: (date: string) =>
    queryOptions({
      queryKey: ["todos", date],
      queryFn: () => fetchDailyTodos({ date }),
      ...CACHE_PROFILE.FAST,
    }),

  byDate: (date: string) =>
    queryOptions({
      queryKey: ["todos", "by-date", date],
      queryFn: () => fetchDailyTodosByDate({ date }),
      ...CACHE_PROFILE.FAST,
    }),

  categories: () =>
    queryOptions({
      queryKey: ["todos", "categories"],
      queryFn: () => fetchDailyTodoCategories(),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
