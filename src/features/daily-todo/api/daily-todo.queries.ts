import { queryOptions } from "@tanstack/react-query";

import { fetchDailyTodos } from "./daily-todo.api";

export const fetchDailyTodosQueryOption = ({ date }: { date: string }) =>
  queryOptions({
    queryKey: ["todos", { date: date }],
    queryFn: () => fetchDailyTodos({ date }),
  });
