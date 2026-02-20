import { format, isSameDay } from "date-fns";
import { Badge } from "@mui/material";
import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers";
import { useRouterQuery } from "@/shared/model";

type Props = PickersDayProps<Date> & { days?: string[] };

export const CalendarDay = ({ days = [], ...pickersDayProps }: Props) => {
  const { updateQuery } = useRouterQuery();
  const { day } = pickersDayProps;

  const shouldShow = days.some((d) => isSameDay(d, day));

  return (
    <Badge overlap="circular" badgeContent={shouldShow ? "✔" : undefined}>
      <PickersDay
        {...pickersDayProps}
        onDaySelect={(selectedDate) => {
          updateQuery(
            { selectedDate: format(selectedDate as Date, "yyyy-MM-dd") },
            { replace: true },
          );
        }}
      />
    </Badge>
  );
};
