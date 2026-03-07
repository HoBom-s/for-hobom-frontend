import { format, isValid, parseISO } from "date-fns";

export const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

export const getNow = (): Date => new Date();

export const getDatePickerToolbarTitle = (
  query: URLSearchParams,
  now: Date,
): string => {
  const dateFromQuery = query.get("selectedDate");
  if (dateFromQuery == null) return formatDate(now);
  const parsed = parseISO(dateFromQuery);
  return formatDate(isValid(parsed) ? parsed : now);
};

export const getSelectedDate = (query: URLSearchParams, now: Date): Date => {
  const dateFromQuery = query.get("selectedDate");
  return typeof dateFromQuery === "string" ? parseISO(dateFromQuery) : now;
};

export const normalizeTodoDateToUtcMidnight = (
  todoDateString: string,
): Date => {
  const date = new Date(todoDateString);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
};
