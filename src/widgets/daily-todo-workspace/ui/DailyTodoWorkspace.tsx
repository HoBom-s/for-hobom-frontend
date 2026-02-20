import { Box, Paper, Typography } from "@mui/material";
import { Calendar } from "@/features/calendar";
import { DailyTodoList } from "@/features/view-todos-by-category";

export const DailyTodoWorkspace = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        p: 3,
        gap: 2,
      }}
    >
      {/* 왼쪽: 캘린더 */}
      <Paper
        elevation={1}
        sx={{ overflow: "hidden", flexShrink: 0, alignSelf: "flex-start" }}
      >
        <Calendar.WithSuspense>
          <Calendar />
        </Calendar.WithSuspense>
      </Paper>

      {/* 오른쪽: 할 일 목록 */}
      <Paper
        elevation={1}
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          height: "100%",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <Typography variant="body1" fontWeight={600} color="text.primary">
            오늘의 할 일
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}>
          <DailyTodoList />
        </Box>
      </Paper>
    </Box>
  );
};
