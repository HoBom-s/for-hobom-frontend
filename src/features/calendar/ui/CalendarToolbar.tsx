import { RocketLaunch } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  DatePickerToolbar,
  type DatePickerToolbarProps,
} from "@mui/x-date-pickers";

export const CalendarToolbar = (props: DatePickerToolbarProps) => {
  return (
    <Box
      className={props.className}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <DatePickerToolbar {...props} />
      <RocketLaunch color="info" fontSize="large" sx={{ m: 5 }} />
    </Box>
  );
};
