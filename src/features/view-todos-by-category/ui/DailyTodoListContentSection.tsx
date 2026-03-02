import { type ReactNode, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListSubheader,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Add, CheckCircleOutline, MoreHoriz } from "@mui/icons-material";
import {
  DailyTodoAddButton,
  isCompleteStatus,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  type DailyTodoType,
  type DailyTodoWithCategoryType,
} from "@/entities/daily-todo";
import { Bom } from "@/packages/bom";

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

const CategoryCreateDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const { mutate, isPending } = useCreateCategory();

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (Bom.isEmpty(trimmed)) return;

    mutate(
      { title: trimmed },
      {
        onSuccess: () => {
          setTitle("");
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setTitle("");
        onClose();
      }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ pb: 1 }}>카테고리 추가</DialogTitle>
      <DialogContent sx={{ pt: "12px !important" }}>
        <TextField
          fullWidth
          autoFocus
          variant="outlined"
          label="카테고리 이름"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={() => {
            setTitle("");
            onClose();
          }}
        >
          취소
        </Button>
        <Button
          fullWidth
          variant="contained"
          loading={isPending}
          onClick={handleSubmit}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CategoryMenu = ({
  categoryId,
  categoryTitle,
}: {
  categoryId: string;
  categoryTitle: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(categoryTitle);
  const { mutate: mutateUpdate, isPending: isUpdatePending } =
    useUpdateCategory();
  const { mutate: mutateDelete } = useDeleteCategory();

  const handleEdit = () => {
    const trimmed = editTitle.trim();
    if (Bom.isEmpty(trimmed)) return;

    mutateUpdate(
      { id: categoryId, title: trimmed },
      { onSuccess: () => setEditOpen(false) },
    );
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ p: 0.25 }}
      >
        <MoreHoriz sx={{ fontSize: 16 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { minWidth: 100 } } }}
      >
        <MenuItem
          onClick={() => {
            setEditTitle(categoryTitle);
            setEditOpen(true);
            setAnchorEl(null);
          }}
        >
          수정
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            mutateDelete({ id: categoryId });
            setAnchorEl(null);
          }}
        >
          삭제
        </MenuItem>
      </Menu>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>카테고리 수정</DialogTitle>
        <DialogContent sx={{ pt: "12px !important" }}>
          <TextField
            fullWidth
            autoFocus
            variant="outlined"
            label="카테고리 이름"
            size="small"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleEdit();
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            onClick={() => setEditOpen(false)}
          >
            취소
          </Button>
          <Button
            fullWidth
            variant="contained"
            loading={isUpdatePending}
            onClick={handleEdit}
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
