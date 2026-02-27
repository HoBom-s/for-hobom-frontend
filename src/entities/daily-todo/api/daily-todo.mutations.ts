import { mutationOptions } from "@tanstack/react-query";
import {
  postDailyTodoCreate,
  deleteDailyTodoById,
  patchDailyTodoCompleteStatusChange,
  patchDailyTodo,
  patchDailyTodoCycle,
  patchDailyTodoReaction,
} from "../api/daily-todo.api";

export const todoMutations = {
  todos: () => ["todos"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...todoMutations.todos(), "create"] as const,
      mutationFn: postDailyTodoCreate,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...todoMutations.todos(), "update"] as const,
      mutationFn: patchDailyTodo,
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
  changeCycle: () =>
    mutationOptions({
      mutationKey: [...todoMutations.todos(), "changeCycle"] as const,
      mutationFn: patchDailyTodoCycle,
    }),
  changeReaction: () =>
    mutationOptions({
      mutationKey: [...todoMutations.todos(), "changeReaction"] as const,
      mutationFn: patchDailyTodoReaction,
    }),
} as const;
