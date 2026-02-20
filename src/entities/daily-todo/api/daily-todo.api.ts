import { httpClient } from "@/shared/api";

import type { ProgressType } from "./daily-todo.type.ts";

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
