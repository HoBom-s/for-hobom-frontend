import { httpClient, type HttpResponseType } from "@/shared/api";
import type { CategoryType } from "@/entities/daily-todo";

export const fetchDailyTodoCategories = async () => {
  return await httpClient.get<HttpResponseType<CategoryType[]>>(`/categories`);
};
