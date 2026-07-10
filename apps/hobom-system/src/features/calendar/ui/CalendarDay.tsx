import { format, isSameDay } from "date-fns";
import { Calendar, type CalendarDayProps } from "hobom-design-system/date-pickers";
import { useRouterQuery } from "@/shared/model";

type Props = CalendarDayProps & { days: Date[] };

export const CalendarDay = ({ days, ...day }: Props) => {
  const { updateQuery } = useRouterQuery();

  const hasTodo = days.some((d) => isSameDay(d, day.date));

  return (
    <Calendar.DayButton
      {...day}
      dot={hasTodo && !day.outsideMonth}
      onSelect={(selectedDate) => {
        updateQuery({ selectedDate: format(selectedDate, "yyyy-MM-dd") }, { replace: true });
      }}
    />
  );
};
