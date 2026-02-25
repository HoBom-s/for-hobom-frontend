import { todoQueries } from "./api/daily-todo.queries";
import {
  getNow,
  formatDate,
  getDatePickerToolbarTitle,
  getSelectedDate,
  normalizeTodoDateToUtcMidnight,
} from "./lib/calendar-date.lib";
import {
  changeCompleteStatus,
  isCompleteStatus,
} from "./model/daily-todo-complete-status.model";
import { createTodosWithCategory } from "./model/create-todo-with-category.model.ts";
import { useChangeDailyTodoCompleteStatus } from "./model/useChangeDailyTodoCompleteStatus";
import { useCreateDailyTodo } from "./model/useCreateDailyTodo";
import { useDeleteDailyTodo } from "./model/useDeleteDailyTodo";
import { DailyTodoListItem } from "./ui/DailyTodoListItem";
import { DailyTodoAddButton } from "./ui/DailyTodoAddButton";

import type {
  DailyTodoType,
  ProgressType,
  DailyTodoWithCategoryType,
} from "./api/daily-todo.type";
import type { CategoryType } from "./api/daily-todo-category.type";

export {
  todoQueries,
  getNow,
  formatDate,
  getDatePickerToolbarTitle,
  getSelectedDate,
  normalizeTodoDateToUtcMidnight,
  changeCompleteStatus,
  isCompleteStatus,
  createTodosWithCategory,
  useChangeDailyTodoCompleteStatus,
  DailyTodoListItem,
  DailyTodoAddButton,
  useCreateDailyTodo,
  useDeleteDailyTodo,
};

export type {
  DailyTodoType,
  ProgressType,
  DailyTodoWithCategoryType,
  CategoryType,
};
