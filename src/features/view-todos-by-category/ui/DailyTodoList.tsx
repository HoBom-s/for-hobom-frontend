import { type ReactNode, Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { ContentPasteTwoTone } from "@mui/icons-material";
import { DailyTodoListItem } from "@/entities/daily-todo";

import { DailyTodoListContentSection } from "./DailyTodoListContentSection";
import { useDailyTodoList } from "../model/useDailyTodoList";

export const DailyTodoList = () => {
  const { groupedTodosWithCategory, shouldShowEmptyFallback } =
    useDailyTodoList();

  if (shouldShowEmptyFallback) {
    return <DailyTodoList.Fallback />;
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <DailyTodoListContentSection
        groupedTodos={groupedTodosWithCategory}
        renderItem={(todo) => <DailyTodoListItem key={todo.id} item={todo} />}
      />
    </Box>
  );
};

DailyTodoList.Fallback = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={105}
    >
      <Box>
        <ContentPasteTwoTone fontSize="medium" />
      </Box>
      <Box>
        <Typography variant="caption">There is no todos..</Typography>
      </Box>
    </Box>
  );
};

DailyTodoList.WithSuspense = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};
