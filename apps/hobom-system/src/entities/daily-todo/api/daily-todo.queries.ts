import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchDailyTodos, fetchDailyTodosByDate } from "./daily-todo.api";
import { fetchDailyTodoCategories } from "./daily-todo-category.api";

export const todoQueries = {
  todos: () => ["todos"],

  list: (date: string) =>
    queryOptions({
      queryKey: ["todos", date],
      queryFn: ({ signal }) => fetchDailyTodos({ date }, signal),
      ...CACHE_PROFILE.FAST,
    }),

  byDate: (date: string) =>
    queryOptions({
      queryKey: ["todos", "by-date", date],
      queryFn: ({ signal }) => fetchDailyTodosByDate({ date }, signal),
      ...CACHE_PROFILE.FAST,
    }),

  categories: () =>
    queryOptions({
      queryKey: ["todos", "categories"],
      queryFn: ({ signal }) => fetchDailyTodoCategories(signal),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
