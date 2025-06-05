import { type ReactNode, Suspense } from "react";
import { Box } from "@mui/material";
import { DailyTodoListItem } from "@/entities/daily-todo";

import { DailyTodoListContentSection } from "./DailyTodoListContentSection";
import { useDailyTodoList } from "../model/useDailyTodoList";

export const DailyTodoList = () => {
  const { groupedTodosWithCategory } = useDailyTodoList();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <DailyTodoListContentSection
        groupedTodos={groupedTodosWithCategory}
        renderItem={(todo) => <DailyTodoListItem key={todo.id} item={todo} />}
      />
    </Box>
  );
};

DailyTodoList.WithSuspense = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};
