import {
  deleteDailyTodoById,
  fetchDailyTodos,
  fetchDailyTodosByDate,
  patchDailyTodoCompleteStatusChange,
  postDailyTodoCreate,
} from "./api/daily-todo.api";
import {
  fetchDailyTodosQueryOption,
  fetchDailyTodosByDateQueryOption,
} from "./api/daily-todo.queries";
import {
  getNow,
  formatDate,
  getDatePickerToolbarTitle,
  getSelectedDate,
  normalizeTodoDateToUtcMidnight,
} from "./lib/calendar-date.lib";
import {
  DailyTodoCompleteStatusModel,
  changeCompleteStatus,
  isCompleteStatus,
  isProgressStatus,
} from "./model/daily-todo-complete-status.model";
import { DailyTodoCycleModel } from "./model/daily-todo-cycle.model";
import { createTodosWithCategory } from "./model/create-todo-with-category.model.ts";
import { useChangeDailyTodoCompleteStatus } from "./model/useChangeDailyTodoCompleteStatus";
import { DailyTodoListItem } from "./ui/DailyTodoListItem";
import { fetchDailyTodoCategories } from "./api/daily-todo-category.api";
import { fetchDailyTodoCategoriesOption } from "./api/daily-todo-category.queries";
import { DailyTodoAddButton } from "./ui/DailyTodoAddButton";
import { useCreateDailyTodo } from "./model/useCreateDailyTodo";
import { useDeleteDailyTodo } from "./model/useDeleteDailyTodo.ts";

import type {
  DailyTodoType,
  ProgressType,
  CycleType,
  DailyTodoWithCategoryType,
} from "./api/daily-todo.type";
import type { CategoryType } from "./api/daily-todo-category.type";

export {
  fetchDailyTodos,
  fetchDailyTodosByDate,
  patchDailyTodoCompleteStatusChange,
  fetchDailyTodosQueryOption,
  fetchDailyTodosByDateQueryOption,
  postDailyTodoCreate,
  deleteDailyTodoById,
  getNow,
  formatDate,
  getDatePickerToolbarTitle,
  getSelectedDate,
  normalizeTodoDateToUtcMidnight,
  DailyTodoCompleteStatusModel,
  changeCompleteStatus,
  isCompleteStatus,
  isProgressStatus,
  DailyTodoCycleModel,
  createTodosWithCategory,
  useChangeDailyTodoCompleteStatus,
  DailyTodoListItem,
  fetchDailyTodoCategories,
  fetchDailyTodoCategoriesOption,
  DailyTodoAddButton,
  useCreateDailyTodo,
  useDeleteDailyTodo,
};

export type {
  DailyTodoType,
  ProgressType,
  CycleType,
  CategoryType,
  DailyTodoWithCategoryType,
};
