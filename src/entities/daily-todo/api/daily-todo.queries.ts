import { queryOptions } from "@tanstack/react-query";

import { fetchDailyTodos, fetchDailyTodosByDate } from "./daily-todo.api.ts";

export const fetchDailyTodosQueryOption = (date: string) =>
  queryOptions({
    queryKey: ["todos", date],
    queryFn: () => fetchDailyTodos({ date }),
  });

export const fetchDailyTodosByDateQueryOption = (date: string) =>
  queryOptions({
    queryKey: ["todos", "by-date", date],
    queryFn: () => fetchDailyTodosByDate({ date }),
  });
