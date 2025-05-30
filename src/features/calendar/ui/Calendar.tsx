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
import type { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { CalendarToolbar } from "@/features/calendar/ui";
import { HoBomSkeleton } from "@/shared/skeleton";
import { fetchDailyTodosQueryOption } from "@/features/daily-todo/api";
import { CalendarBadge } from "@/features/daily-todo/ui";
import { useRouterQuery } from "@/apps/router/model";
import { Bom } from "@/packages/bom";

export const Calendar = () => {
  const { query } = useRouterQuery();

  const now = new Date();
  const date = format(now, "yyyy-MM-dd");
  const selectedDate = query.get("selectedDate") || now;

  const { data: todos } = useSuspenseQuery(
    fetchDailyTodosQueryOption({ date }),
  );

  const days = Bom.pipe(
    todos.items,
    Bom.map((item) => item.date),
  );

  return (
    <Box boxShadow={1} my={2}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="mobile"
          value={
            typeof selectedDate === "string"
              ? parseISO(selectedDate)
              : selectedDate
          }
          slots={{
            toolbar: CalendarToolbar,
            day: CalendarBadge as any,
          }}
          slotProps={{
            toolbar: { toolbarFormat: "yyyy" },
            actionBar: { actions: undefined },
            day: {
              days,
            } as PickersDayProps & { days: Date[] },
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
        <div style={{ width: 380, margin: 4 }}>
          <HoBomSkeleton.Card />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
