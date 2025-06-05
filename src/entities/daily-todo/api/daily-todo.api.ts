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

export const postDailyTodoCreate = async ({
  title,
  date,
  category,
}: {
  title: string;
  date: string;
  category: string;
}) => {
  await httpClient.post(`/daily-todos`, {
    title,
    date,
    category,
  });
};

export const deleteDailyTodoById = async ({ id }: { id: string }) => {
  await httpClient.delete(`/daily-todos/${id}`);
};
