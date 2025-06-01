import { Box } from "@mui/material";
import { FixedBottomSheet } from "@/features/fixed-bottom-sheet";
import { Calendar } from "@/features/calendar";
import { DailyTodoList } from "@/features/daily-todo";

export default function DailyTodoPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100dvh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          pb: 56,
        }}
      >
        <Calendar.WithSuspense>
          <Calendar />
        </Calendar.WithSuspense>
        <Box
          sx={{
            minHeight: 150,
            overflowY: "auto",
            mb: 2,
          }}
        >
          <DailyTodoList />
        </Box>
      </Box>
      <FixedBottomSheet />
    </Box>
  );
}
