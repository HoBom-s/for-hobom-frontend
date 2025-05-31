import { type ReactNode, Suspense } from "react";
import { format } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  DayCalendarSkeleton,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarDay, CalendarToolbar } from "@/features/daily-todo/ui/";
import { fetchDailyTodosQueryOption } from "@/features/daily-todo/api";
import {
  getDatePickerToolbarTitle,
  getNow,
  getSelectedDate,
  normalizeTodoDateToUtcMidnight,
} from "@/features/daily-todo/lib";
import { HoBomSkeleton } from "@/shared/skeleton";
import { useRouterQuery } from "@/apps/router/model";
import { Bom } from "@/packages/bom";

export const Calendar = () => {
  const { query } = useRouterQuery();

  const now = getNow();

  const { data: todos } = useSuspenseQuery(
    Bom.pipe(
      now,
      (now) => format(now, "yyyy-MM-dd"),
      (date) => fetchDailyTodosQueryOption({ date }),
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
