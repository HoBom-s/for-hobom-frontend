import { queryOptions } from "@tanstack/react-query";
import { fetchDailyTodoCategories } from "@/entities/daily-todo";

export const fetchDailyTodoCategoriesOption = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: () => fetchDailyTodoCategories(),
  });
