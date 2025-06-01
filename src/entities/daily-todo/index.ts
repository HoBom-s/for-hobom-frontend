import {
  fetchDailyTodos,
  fetchDailyTodosByDate,
  patchDailyTodoCompleteStatusChange,
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
import {
  splitTodosByCategory,
  createGroupedTodosByCategoryId,
} from "./model/split-todo-by-category.model";
import { useChangeDailyTodoCompleteStatus } from "./model/useChangeDailyTodoCompleteStatus";
import { DailyTodoListItem } from "./ui/DailyTodoListItem";

import type {
  DailyTodoType,
  ProgressType,
  CycleType,
} from "./api/daily-todo.type";

export {
  fetchDailyTodos,
  fetchDailyTodosByDate,
  patchDailyTodoCompleteStatusChange,
  fetchDailyTodosQueryOption,
  fetchDailyTodosByDateQueryOption,
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
  splitTodosByCategory,
  createGroupedTodosByCategoryId,
  useChangeDailyTodoCompleteStatus,
  DailyTodoListItem,
};

export type { DailyTodoType, ProgressType, CycleType };
