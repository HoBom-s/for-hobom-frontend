import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/features/calendar";
import { DailyTodoList } from "@/features/view-todos-by-category";
import { useRouterQuery } from "@/shared/model";
import { getNow, getSelectedDate } from "@/entities/daily-todo";
import { Hb } from "@/shared/ui";

const DateHeader = () => {
  const { query } = useRouterQuery();
  const selected = getSelectedDate(query, getNow());

  return (
    <Hb.Box
      sx={{
        px: 3,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        flexShrink: 0,
      }}
    >
      <Hb.Text variant="h5" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.3 }}>
        {format(selected, "M월 d일 EEEE", { locale: ko })}
      </Hb.Text>
      <Hb.Text variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
        {format(selected, "yyyy년")}
      </Hb.Text>
    </Hb.Box>
  );
};

export const DailyTodoWorkspace = () => {
  return (
    <Hb.Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        p: 3,
        gap: 2,
      }}
    >
      <Hb.Paper
        elevation={0}
        style={{
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "flex-start",
          border: "1px solid",
          borderColor: "var(--hb-color-border)",
          borderRadius: 16,
        }}
      >
        <Calendar.WithSuspense>
          <Calendar />
        </Calendar.WithSuspense>
      </Hb.Paper>
      <Hb.Paper
        elevation={0}
        style={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          height: "100%",
          border: "1px solid",
          borderColor: "var(--hb-color-border)",
          borderRadius: 16,
        }}
      >
        <DateHeader />
        <Hb.Box sx={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}>
          <DailyTodoList.WithSuspense>
            <DailyTodoList />
          </DailyTodoList.WithSuspense>
        </Hb.Box>
      </Hb.Paper>
    </Hb.Box>
  );
};
