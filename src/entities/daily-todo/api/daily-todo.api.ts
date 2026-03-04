import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";

import type { DailyTodoType, ProgressType } from "./daily-todo.type.ts";

export const fetchDailyTodos = async ({ date }: { date: string }) => {
  return await httpClient.get<HttpResponseType<DailyTodoType[]>>(
    `/api/daily-todos?date=${date}`,
  );
};

export const fetchDailyTodosByDate = async ({ date }: { date: string }) => {
  return await httpClient.get<HttpResponseType<DailyTodoType[]>>(
    `/api/daily-todos/by-date/${date}`,
  );
};

export const patchDailyTodoCompleteStatusChange = async ({
  id,
  status,
}: {
  id: string;
  status: ProgressType;
}) => {
  return await httpClient.patch(`/api/daily-todos/${id}/complete-status`, {
    status,
  });
};

export const postDailyTodoCreate = async ({
  title,
  date,
  category,
  cycle,
}: {
  title: string;
  date: string;
  category: string;
  cycle?: string;
}) => {
  await httpClient.post(`/api/daily-todos`, {
    title,
    date,
    category,
    ...(cycle && { cycle }),
  });
};

export const patchDailyTodo = async ({
  id,
  ...body
}: {
  id: string;
  title?: string;
  date?: string;
  category?: string;
}) => {
  return await httpClient.patch(`/api/daily-todos/${id}`, body);
};

export const patchDailyTodoCycle = async ({
  id,
  cycle,
}: {
  id: string;
  cycle: string;
}) => {
  return await httpClient.patch(`/api/daily-todos/${id}/cycle-status`, {
    cycle,
  });
};

export const patchDailyTodoReaction = async ({
  id,
  reaction,
  reactionUserId,
}: {
  id: string;
  reaction: string;
  reactionUserId: string;
}) => {
  return await httpClient.patch(`/api/daily-todos/${id}/reaction`, {
    reaction,
    reactionUserId,
  });
};

export const deleteDailyTodoById = async ({ id }: { id: string }) => {
  await httpClient.delete(`/api/daily-todos/${id}`);
};
