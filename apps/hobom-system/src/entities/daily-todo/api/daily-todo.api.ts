import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { dailyTodoListSchema } from "./daily-todo.schema";
import type { DailyTodoType, ProgressType } from "./daily-todo.type.ts";

export const fetchDailyTodos = async ({ date }: { date: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<DailyTodoType[]>>(`/daily-todos?date=${date}`, {
    signal,
  });

  return { ...res, items: parseResponse(dailyTodoListSchema, "GET /daily-todos")(res.items) };
};

export const fetchDailyTodosByDate = async ({ date }: { date: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<DailyTodoType[]>>(
    `/daily-todos/by-date/${date}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(dailyTodoListSchema, "GET /daily-todos/by-date/:date")(res.items),
  };
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
  cycle,
}: {
  title: string;
  date: string;
  category: string;
  cycle?: string;
}) => {
  await httpClient.post(`/daily-todos`, {
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
  return await httpClient.patch(`/daily-todos/${id}`, body);
};

export const patchDailyTodoCycle = async ({ id, cycle }: { id: string; cycle: string }) => {
  return await httpClient.patch(`/daily-todos/${id}/cycle-status`, {
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
  return await httpClient.patch(`/daily-todos/${id}/reaction`, {
    reaction,
    reactionUserId,
  });
};

export const deleteDailyTodoById = async ({ id }: { id: string }) => {
  await httpClient.delete(`/daily-todos/${id}`);
};
