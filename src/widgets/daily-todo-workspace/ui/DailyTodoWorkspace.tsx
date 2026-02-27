import { Box, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/features/calendar";
import { DailyTodoList } from "@/features/view-todos-by-category";
import { useRouterQuery } from "@/shared/model";
import { getNow, getSelectedDate } from "@/entities/daily-todo";

const DateHeader = () => {
  const { query } = useRouterQuery();
  const selected = getSelectedDate(query, getNow());

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        flexShrink: 0,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.3 }}
      >
        {format(selected, "M월 d일 EEEE", { locale: ko })}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
        {format(selected, "yyyy년")}
      </Typography>
    </Box>
  );
};

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
        elevation={0}
        sx={{
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "flex-start",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Calendar.WithSuspense>
          <Calendar />
        </Calendar.WithSuspense>
      </Paper>

      {/* 오른쪽: 할 일 목록 */}
      <Paper
        elevation={0}
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          height: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <DateHeader />
        <Box sx={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}>
          <DailyTodoList />
        </Box>
      </Paper>
    </Box>
  );
};
