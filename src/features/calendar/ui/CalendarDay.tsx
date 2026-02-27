import { format, isSameDay, isToday } from "date-fns";
import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers";
import { useRouterQuery } from "@/shared/model";

type Props = PickersDayProps & { days?: Date[] };

export const CalendarDay = ({ days = [], ...pickersDayProps }: Props) => {
  const { updateQuery } = useRouterQuery();
  const { day, selected, outsideCurrentMonth } = pickersDayProps;

  const hasTodo = days.some((d) => isSameDay(d, day as Date));
  const isCurrentDay = isToday(day as Date);

  return (
    <PickersDay
      {...pickersDayProps}
      onDaySelect={(selectedDate) => {
        updateQuery(
          { selectedDate: format(selectedDate as Date, "yyyy-MM-dd") },
          { replace: true },
        );
      }}
      sx={{
        position: "relative",
        fontWeight: isCurrentDay ? 700 : 400,
        fontSize: "0.8125rem",
        borderRadius: "50%",
        transition: "all 0.15s ease",
        "&.Mui-selected": {
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontWeight: 600,
          "&:hover": { bgcolor: "primary.dark" },
          "&:focus": { bgcolor: "primary.main" },
        },
        ...(!selected &&
          isCurrentDay && {
            border: "1.5px solid",
            borderColor: "primary.main",
            color: "primary.main",
          }),
        ...(hasTodo &&
          !outsideCurrentMonth && {
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 2,
              left: "50%",
              transform: "translateX(-50%)",
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: selected ? "primary.contrastText" : "success.main",
              transition: "background-color 0.15s ease",
            },
          }),
      }}
    />
  );
};
