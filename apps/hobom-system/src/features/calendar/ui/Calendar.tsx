import { type ReactNode, Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  DayCalendarSkeleton,
  LocalizationProvider,
  StaticDatePicker,
  type PickersDayProps,
} from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { Bom } from "hobom-utils";
import {
  todoQueries,
  formatDate,
  getNow,
  getSelectedDate,
  normalizeTodoDateToUtcMidnight,
} from "@/entities/daily-todo";
import { HoBomSkeleton } from "@/shared/ui";
import { useRouterQuery } from "@/shared/model";
import { CalendarDay } from "./CalendarDay";

export const Calendar = () => {
  const { query, updateQuery } = useRouterQuery();

  const now = getNow();
  const selectedDate = getSelectedDate(query, now);
  const monthDate = formatDate(startOfMonth(selectedDate));
  const { data: todos } = useSuspenseQuery(todoQueries.list(monthDate));
  const days: Date[] = Bom.pipe(
    todos.items,
    Bom.map(Bom.prop("date")),
    Bom.map(normalizeTodoDateToUtcMidnight),
  );

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          slots={{
            toolbar: () => null,
            day: CalendarDay,
          }}
          slotProps={{
            actionBar: { actions: [] },
            day: { days } as unknown as PickersDayProps,
          }}
          onMonthChange={(month) => {
            const date = Bom.pipe(month as Date, formatDate);

            updateQuery({ selectedDate: date }, { replace: true });
          }}
          renderLoading={() => <DayCalendarSkeleton />}
          sx={{
            "& .MuiPickersLayout-root": {
              minWidth: "unset",
            },
            "& .MuiPickersCalendarHeader-root": {
              px: 1.5,
              mt: 1,
            },
            "& .MuiPickersCalendarHeader-label": {
              fontSize: "0.9375rem",
              fontWeight: 700,
            },
            "& .MuiDayCalendar-weekDayLabel": {
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "text.secondary",
            },
            "& .MuiDayCalendar-slideTransition": {
              minHeight: 240,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

Calendar.WithSuspense = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div style={{ width: 320, margin: 4, height: 400 }}>
          <HoBomSkeleton.Card />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
