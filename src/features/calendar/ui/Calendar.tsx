import { type ReactNode, Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  DayCalendarSkeleton,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  formatDate,
  getDatePickerToolbarTitle,
  getNow,
  getSelectedDate,
  normalizeTodoDateToUtcMidnight,
  fetchDailyTodosQueryOption,
} from "@/entities/daily-todo";
import { HoBomSkeleton } from "@/shared/skeleton";
import { useRouterQuery } from "@/apps/router/model";
import { Bom } from "@/packages/bom";

import { CalendarToolbar } from "./CalendarToolbar";
import { CalendarDay } from "./CalendarDay";

export const Calendar = () => {
  const { query, updateQuery } = useRouterQuery();

  const now = getNow();
  const { data: todos } = useSuspenseQuery(
    Bom.pipe(
      now,
      (month) => getSelectedDate(query, month),
      formatDate,
      fetchDailyTodosQueryOption,
    ),
  );
  const days: Date[] = Bom.pipe(
    todos.items,
    Bom.map(Bom.prop("date")),
    Bom.map(normalizeTodoDateToUtcMidnight),
  );

  return (
    <Box boxShadow={1} my={2}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        localeText={{
          datePickerToolbarTitle: getDatePickerToolbarTitle(query, now),
        }}
      >
        <StaticDatePicker
          displayStaticWrapperAs="mobile"
          value={getSelectedDate(query, now)}
          slots={{
            toolbar: CalendarToolbar,
            day: CalendarDay as any,
          }}
          slotProps={{
            toolbar: { toolbarFormat: "yyyy-MM" },
            actionBar: { actions: undefined },
            day: {
              days,
            } as any,
          }}
          onMonthChange={(month) => {
            const date = Bom.pipe(month, formatDate);
            updateQuery({ selectedDate: date }, { replace: true });
          }}
          renderLoading={() => <DayCalendarSkeleton />}
        />
      </LocalizationProvider>
    </Box>
  );
};

Calendar.WithSuspense = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div style={{ width: 380, margin: 4, height: 500 }}>
          <HoBomSkeleton.Card />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
