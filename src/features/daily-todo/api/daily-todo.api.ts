import { httpClient } from "@/shared/http/model";
import type { HttpResponseType } from "@/shared/http/api";

import type { DailyTodoType } from "./daily-todo.type";

export const fetchDailyTodos = async ({ date }: { date: string }) => {
  return await httpClient.get<HttpResponseType<DailyTodoType[]>>(
    `/daily-todos?date=${date}`,
  );
};
