import { format, isValid, parseISO } from "date-fns";
import { Bom } from "@/packages/bom";

export const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

export const getNow = () => new Date();

export const getDatePickerToolbarTitle = (
  query: URLSearchParams,
  now: Date,
): string => {
  const dateFromQuery = query.get("selectedDate");
  return Bom.pipe(
    dateFromQuery,
    (fromQuery) => {
      if (Bom.isNullish(fromQuery)) {
        return now;
      }
      const parsed = parseISO(fromQuery);
      return isValid(parsed) ? parsed : now;
    },
    formatDate,
  );
};

export const getSelectedDate = (query: URLSearchParams, now: Date): Date => {
  const dateFromQuery = query.get("selectedDate");
  return Bom.pipe(dateFromQuery, (fromQuery) =>
    Bom.isString(fromQuery) ? parseISO(fromQuery) : now,
  );
};

export const normalizeTodoDateToUtcMidnight = (
  todoDateString: string,
): Date => {
  const date = new Date(todoDateString);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
};
