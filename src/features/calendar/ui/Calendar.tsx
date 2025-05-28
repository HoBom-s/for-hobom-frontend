import {
  DayCalendarSkeleton,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarToolbar } from "@/features/calendar/ui";

export const Calendar = () => {
  const now = new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        defaultValue={now}
        displayStaticWrapperAs="mobile"
        slots={{
          toolbar: CalendarToolbar,
        }}
        slotProps={{
          toolbar: { toolbarFormat: "yyyy" },
          actionBar: { actions: undefined },
        }}
        renderLoading={() => <DayCalendarSkeleton />}
      />
    </LocalizationProvider>
  );
};
