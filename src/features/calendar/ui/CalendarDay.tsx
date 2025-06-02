import { format, isSameDay } from "date-fns";
import { Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import { useRouterQuery } from "@/shared/router/model";

interface Props {
  day: Date;
  selected: boolean;
  days: string[];
}

export const CalendarDay = ({ day, selected, days }: Props) => {
  const { updateQuery } = useRouterQuery();

  const shouldShow = days.some((d) => isSameDay(d, day));

  return (
    <Badge overlap="circular" badgeContent={shouldShow ? "✔" : undefined}>
      <PickersDay
        day={day}
        selected={selected}
        outsideCurrentMonth={false}
        isFirstVisibleCell={false}
        isLastVisibleCell={false}
        onDaySelect={(selectedDate) => {
          updateQuery(
            {
              selectedDate: format(selectedDate, "yyyy-MM-dd"),
            },
            {
              replace: true,
            },
          );
        }}
      />
    </Badge>
  );
};
