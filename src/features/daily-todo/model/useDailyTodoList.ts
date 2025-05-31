import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  type DailyTodoType,
  fetchDailyTodosByDateQueryOption,
} from "@/features/daily-todo/api";
import { getNow, getSelectedDate, formatDate } from "@/features/daily-todo/lib";
import { useRouterQuery } from "@/apps/router/model";
import { Bom } from "@/packages/bom";
import { splitTodosByCategory } from "./split-todo-by-category.model";

export const useDailyTodoList = () => {
  const { query } = useRouterQuery();
  const now = getNow();
  const date = Bom.pipe(getSelectedDate(query, now), formatDate);
  const { data: todos } = useSuspenseQuery(
    Bom.pipe(date, (date) => fetchDailyTodosByDateQueryOption({ date })),
  );

  const [todosWithNoCategory, todosWithCategory] = Bom.pipe(
    todos.items,
    splitTodosByCategory,
  );
  const groupedTodosWithCategory = useMemo(
    () =>
      Bom.pipe(
        todosWithCategory,
        Bom.reduce(
          (acc, todo) => {
            const categoryId = todo.category.id;
            if (acc[categoryId] == null) {
              acc[categoryId] = [];
            }

            acc[categoryId].push(todo);

            return acc;
          },
          {} as Record<string, DailyTodoType[]>,
        ),
      ),
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
