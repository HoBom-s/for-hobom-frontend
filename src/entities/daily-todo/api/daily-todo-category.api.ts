import { httpClient, type HttpResponseType } from "@/shared/api";
import type { CategoryType } from "@/entities/daily-todo";

export const fetchDailyTodoCategories = async () => {
  return await httpClient.get<HttpResponseType<CategoryType[]>>(
    `/api/categories`,
  );
};

export const postCategory = async ({ title }: { title: string }) => {
  return await httpClient.post(`/api/categories`, { title });
};

export const patchCategory = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  return await httpClient.patch(`/api/categories/${id}`, { title });
};

export const deleteCategory = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/api/categories/${id}`);
};
