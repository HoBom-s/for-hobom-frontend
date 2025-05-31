import { useRouterQuery } from "@/apps/router/model";
import { format } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  type DailyTodoType,
  fetchDailyTodosByDateQueryOption,
} from "@/features/daily-todo/api";
import { Bom } from "@/packages/bom";

export const useDailyTodoList = () => {
  const { query } = useRouterQuery();
  const date = query.get("selectedDate") ?? format(new Date(), "yyyy-MM-dd");

  const { data: todos } = useSuspenseQuery(
    fetchDailyTodosByDateQueryOption({ date }),
  );

  const splitTodosByCategory = (
    dailyTodoItems: DailyTodoType[],
  ): ReadonlyArray<DailyTodoType[]> => {
    const todosWithNoCategory: DailyTodoType[] = [];
    const todosWithCategory: DailyTodoType[] = [];

    Bom.forEach(dailyTodoItems, (item) =>
      Bom.isNullish(item.category)
        ? todosWithNoCategory.push(item)
        : todosWithCategory.push(item),
    );

    return [todosWithNoCategory, todosWithCategory] as const;
  };

  const [todosWithNoCategory, todosWithCategory] = Bom.pipe(
    todos.items,
    splitTodosByCategory,
  );
  const groupedTodosWithCategory = Bom.pipe(
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
