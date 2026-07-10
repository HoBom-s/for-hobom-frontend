import { type ReactNode, Suspense } from "react";
import { useSuspenseQuery } from "hobom-data";
import { Calendar as HbCalendar } from "hobom-design-system/date-pickers";
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
import { Hb, HoBomSkeleton } from "@/shared/ui";
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
    <Hb.Box>
      <HbCalendar
        value={selectedDate}
        locale={ko}
        labelFormat="yyyy년 M월"
        renderDay={(dayProps) => <CalendarDay {...dayProps} days={days} />}
        onMonthChange={(month) => {
          updateQuery({ selectedDate: formatDate(month) }, { replace: true });
        }}
      />
    </Hb.Box>
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
