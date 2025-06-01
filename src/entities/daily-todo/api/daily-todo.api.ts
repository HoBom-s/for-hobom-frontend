import { httpClient } from "@/shared/http";
import type { HttpResponseType } from "@/shared/http";

import type { DailyTodoType, ProgressType } from "./daily-todo.type.ts";

export const fetchDailyTodos = async ({ date }: { date: string }) => {
  return await httpClient.get<HttpResponseType<DailyTodoType[]>>(
    `/daily-todos?date=${date}`,
  );
};

export const fetchDailyTodosByDate = async ({ date }: { date: string }) => {
  return await httpClient.get<HttpResponseType<DailyTodoType[]>>(
    `/daily-todos/by-date/${date}`,
  );
};

export const patchDailyTodoCompleteStatusChange = async ({
  id,
  status,
}: {
  id: string;
  status: ProgressType;
}) => {
  return await httpClient.patch(`/daily-todos/${id}/complete-status`, {
    status,
  });
};
