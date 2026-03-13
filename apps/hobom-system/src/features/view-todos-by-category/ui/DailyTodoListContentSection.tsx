import { type ReactNode, useState } from "react";
import {
  Box,
  Button,
  Chip,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Add, CheckCircleOutline } from "@mui/icons-material";
import {
  DailyTodoAddButton,
  isCompleteStatus,
  type DailyTodoType,
  type DailyTodoWithCategoryType,
} from "@/entities/daily-todo";
import { CategoryCreateDialog } from "./CategoryCreateDialog";
import { CategoryMenu } from "./CategoryMenu";

interface Props {
  groupedTodos: DailyTodoWithCategoryType[];
  renderItem: (render: DailyTodoType) => ReactNode;
}

const CategoryProgress = ({ items }: { items: DailyTodoType[] }) => {
  if (items.length === 0) return null;
  const done = items.filter((t) => isCompleteStatus(t.progress)).length;
  const total = items.length;

  return (
    <Chip
      size="small"
      label={`${done}/${total}`}
      sx={{
        height: 20,
        fontSize: "0.6875rem",
        fontWeight: 500,
        bgcolor: done === total ? "success.main" : "action.selected",
        color: done === total ? "success.contrastText" : "text.secondary",
      }}
    />
  );
};

export const DailyTodoListContentSection = ({
  groupedTodos,
  renderItem,
}: Props) => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      {groupedTodos.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            gap: 1.5,
          }}
        >
          <CheckCircleOutline sx={{ fontSize: 64, color: "#dadce0" }} />
          <Typography
            variant="body1"
            sx={{ color: "text.disabled", fontSize: "0.95rem" }}
          >
            오늘의 할 일이 없어요
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%", py: 1 }}>
          {groupedTodos.map((item) => (
            <List
              key={item.categoryId}
              disablePadding
              sx={{ width: "100%", mb: 1 }}
              subheader={
                <ListSubheader
                  disableSticky
                  disableGutters
                  component="div"
                  sx={{
                    px: 2.5,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "text.secondary",
                    bgcolor: "transparent",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {item.categoryTitle}
                  <CategoryProgress items={item.todoItems} />
                  <CategoryMenu
                    categoryId={item.categoryId}
                    categoryTitle={item.categoryTitle}
                  />
                  <Box sx={{ ml: "auto" }}>
                    <DailyTodoAddButton item={item} />
                  </Box>
                </ListSubheader>
              }
            >
              {item.todoItems.map((todo) => renderItem(todo))}
            </List>
          ))}
        </Box>
      )}

      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Button
          size="small"
          startIcon={<Add />}
          sx={{ color: "text.secondary", textTransform: "none" }}
          onClick={() => setCreateOpen(true)}
        >
          카테고리 추가
        </Button>
      </Box>

      <CategoryCreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
};
