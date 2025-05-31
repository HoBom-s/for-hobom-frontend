import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  type DailyTodoType,
  fetchDailyTodosByDateQueryOption,
} from "@/features/daily-todo/api";
import { getNow, getSelectedDate, formatDate } from "@/features/daily-todo/lib";
import { useRouterQuery } from "@/apps/router/model";
import { Bom } from "@/packages/bom";
import {
  createGroupedTodosByCategoryId,
  splitTodosByCategory,
} from "./split-todo-by-category.model";

export const useDailyTodoList = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const date = Bom.pipe(getSelectedDate(query, now), formatDate);
  const { data: todos } = useSuspenseQuery(
    Bom.pipe(date, fetchDailyTodosByDateQueryOption),
  );

  const [todosWithNoCategory, todosWithCategory] = Bom.pipe(
    todos.items,
    splitTodosByCategory,
  );
  const groupedTodosWithCategory: Record<string, DailyTodoType[]> = useMemo(
    (): Record<string, DailyTodoType[]> =>
      Bom.pipe(todosWithCategory, createGroupedTodosByCategoryId),
    [todosWithCategory],
  );
  const shouldShowEmptyFallback = Bom.isTruthy(
    todosWithNoCategory.length === 0 && todosWithCategory.length === 0,
  );

  return {
    todosWithCategory,
    todosWithNoCategory,
    groupedTodosWithCategory,
    shouldShowEmptyFallback,
  };
};
