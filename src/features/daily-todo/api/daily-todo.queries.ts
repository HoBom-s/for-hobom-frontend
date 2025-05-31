import { queryOptions } from "@tanstack/react-query";

import { fetchDailyTodos, fetchDailyTodosByDate } from "./daily-todo.api";

export const fetchDailyTodosQueryOption = ({ date }: { date: string }) =>
  queryOptions({
    queryKey: ["todos", { date: date }],
    queryFn: () => fetchDailyTodos({ date }),
  });

export const fetchDailyTodosByDateQueryOption = ({ date }: { date: string }) =>
  queryOptions({
    queryKey: ["todos", "by-date", { date: date }],
    queryFn: () => fetchDailyTodosByDate({ date }),
  });
