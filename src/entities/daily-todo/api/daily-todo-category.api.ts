import { httpClient, type HttpResponseType } from "@/shared/http";
import type { CategoryType } from "@/entities/daily-todo";

export const fetchDailyTodoCategories = async () => {
  return await httpClient.get<HttpResponseType<CategoryType[]>>(`/categories`);
};
