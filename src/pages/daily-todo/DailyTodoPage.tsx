import { Box } from "@mui/material";
import { FixedBottomSheet } from "@/features/fixed-bottom-sheet/ui";
import { Calendar } from "@/features/calendar/ui";
import { DailyTodoList } from "@/features/daily-todo/ui";

export default function DailyTodoPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div>
        <Calendar />
        <div style={{ maxHeight: 540, height: "100%", overflowY: "auto" }}>
          <DailyTodoList />
          <DailyTodoList />
          <DailyTodoList />
        </div>
      </div>
      <FixedBottomSheet />
    </Box>
  );
}
