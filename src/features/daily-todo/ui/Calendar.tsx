import { type ReactNode, Suspense } from "react";
import { format, parseISO } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  DayCalendarSkeleton,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarDay, CalendarToolbar } from "@/features/daily-todo/ui/";
import {
  type DailyTodoType,
  fetchDailyTodosQueryOption,
} from "@/features/daily-todo/api";
import { HoBomSkeleton } from "@/shared/skeleton";
import { useRouterQuery } from "@/apps/router/model";
import { Bom } from "@/packages/bom";

export const Calendar = () => {
  const { query } = useRouterQuery();

  const now = new Date();
  const date = format(now, "yyyy-MM-dd");
  const dateFromQuery = query.get("selectedDate");
  const selectedDate = dateFromQuery ?? now;

  const { data: todos } = useSuspenseQuery(
    fetchDailyTodosQueryOption({ date }),
  );

  const toUtcMidnightDate = (item: DailyTodoType): Date => {
    const date = new Date(item.date);
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
  };

  const days = Bom.pipe(todos.items, Bom.map(toUtcMidnightDate));

  return (
    <Box boxShadow={1} my={2}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        localeText={{ datePickerToolbarTitle: dateFromQuery ?? date }}
      >
        <StaticDatePicker
          displayStaticWrapperAs="mobile"
          value={
            Bom.isString(selectedDate) ? parseISO(selectedDate) : selectedDate
          }
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
