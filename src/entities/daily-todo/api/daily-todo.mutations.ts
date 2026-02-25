import { mutationOptions } from "@tanstack/react-query";
import {
  postDailyTodoCreate,
  deleteDailyTodoById,
  patchDailyTodoCompleteStatusChange,
} from "../api/daily-todo.api";

export const todoMutations = {
  todos: () => ["todos"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...todoMutations.todos(), "create"] as const,
      mutationFn: postDailyTodoCreate,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...todoMutations.todos(), "delete"] as const,
      mutationFn: deleteDailyTodoById,
    }),
  changeCompleteStatus: () =>
    mutationOptions({
      mutationKey: [...todoMutations.todos(), "changeCompleteStatus"] as const,
      mutationFn: patchDailyTodoCompleteStatusChange,
    }),
} as const;
