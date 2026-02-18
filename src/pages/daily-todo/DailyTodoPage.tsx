import { Box } from "@mui/material";
import { Calendar } from "@/features/calendar";
import { DailyTodoList } from "@/features/view-todos-by-category";

export default function DailyTodoPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        p: 2,
      }}
    >
      <Calendar.WithSuspense>
        <Calendar />
      </Calendar.WithSuspense>
      <Box
        sx={{
          minHeight: 220,
          height: "100%",
          overflowY: "auto",
          mb: 2,
        }}
      >
        <DailyTodoList />
      </Box>
    </Box>
  );
}
