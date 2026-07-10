import { httpClient, parseResponse, type HttpResponseType } from "@/shared/api";
import { categoryListSchema } from "./daily-todo-category.schema";
import type { CategoryType } from "./daily-todo-category.type";

export const fetchDailyTodoCategories = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<CategoryType[]>>(`/categories`, { signal });

  return { ...res, items: parseResponse(categoryListSchema, "GET /categories")(res.items) };
};

export const postCategory = async ({ title }: { title: string }) => {
  return await httpClient.post(`/categories`, { title });
};

export const patchCategory = async ({ id, title }: { id: string; title: string }) => {
  return await httpClient.patch(`/categories/${id}`, { title });
};

export const deleteCategory = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/categories/${id}`);
};
