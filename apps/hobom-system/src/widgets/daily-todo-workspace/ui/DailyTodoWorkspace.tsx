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
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: "1px solid",
        borderColor: "var(--hb-color-border)",
        flexShrink: 0,
      }}
    >
      <Hb.Text
        variant="h5"
        style={{
          fontWeight: 700,
          color: "var(--hb-color-text-primary)",
          lineHeight: 1.3,
        }}
      >
        {format(selected, "M월 d일 EEEE", { locale: ko })}
      </Hb.Text>
      <Hb.Text
        variant="body2"
        style={{
          color: "var(--hb-color-text-secondary)",
          marginTop: 2,
        }}
      >
        {format(selected, "yyyy년")}
      </Hb.Text>
    </Hb.Box>
  );
};

export const DailyTodoWorkspace = () => {
  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        padding: 24,
        gap: 16,
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
        <Hb.Box
          style={{
            flexGrow: 1,
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          <DailyTodoList.WithSuspense>
            <DailyTodoList />
          </DailyTodoList.WithSuspense>
        </Hb.Box>
      </Hb.Paper>
    </Hb.Box>
  );
};
