import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  formatDate,
  normalizeTodoDateToUtcMidnight,
  changeCompleteStatus,
  isCompleteStatus,
  useChangeDailyTodoCompleteStatus,
  useUpdateDailyTodo,
  useUpdateDailyTodoReaction,
  todoQueries,
  CYCLE_LABELS,
  type DailyTodoType,
  type ProgressType,
  type CycleType,
  useDeleteDailyTodo,
} from "@/entities/daily-todo";
import { Bom } from "@/packages/bom";
import { useBottomSheetCTA } from "@/shared/model";

const REACTION_OPTIONS = ["👍", "❤️", "🎉", "😊", "💪", "🔥"];

interface Props {
  item: DailyTodoType;
}

export const DailyTodoListItem = ({ item }: Props) => {
  const { mutate, isPending } = useChangeDailyTodoCompleteStatus(item);
  const { mutate: mutateDelete, isPending: isDeletePending } =
    useDeleteDailyTodo();
  const { mutate: mutateUpdate, isPending: isUpdatePending } =
    useUpdateDailyTodo();
  const { mutate: mutateReaction } = useUpdateDailyTodoReaction();
  const { onOpen, onClose } = useBottomSheetCTA();

  const [editOpen, setEditOpen] = useState(false);
  const [reactionAnchor, setReactionAnchor] = useState<HTMLElement | null>(
    null,
  );

  const {
    register,
    watch,
    reset: resetForm,
  } = useForm<{ title: string }>({
    defaultValues: { title: item.title },
  });

  const { data: categoriesData } = useQuery({
    ...todoQueries.categories(),
    enabled: editOpen,
  });
  const [editCategory, setEditCategory] = useState(item.category.id);

  const handleChangeCompleteStatus = (id: string, status: ProgressType) => {
    Bom.pipe(status, changeCompleteStatus, (newStatus) =>
      mutate({ id, status: newStatus }),
    );
  };

  const handleEditSubmit = () => {
    const title = watch("title").trim();
    if (Bom.isEmpty(title)) return;

    mutateUpdate(
      { id: item.id, title, category: editCategory },
      {
        onSuccess: () => {
          setEditOpen(false);
          onClose();
        },
      },
    );
  };

  const handleReaction = (emoji: string) => {
    mutateReaction({
      id: item.id,
      reaction: emoji,
      reactionUserId: item.owner.id,
    });
    setReactionAnchor(null);
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {item.reaction && (
              <IconButton
                size="small"
                onClick={(e) => setReactionAnchor(e.currentTarget)}
                sx={{ fontSize: "1rem", p: 0.5 }}
              >
                {item.reaction.value}
              </IconButton>
            )}
            <IconButton
              size="small"
              edge="end"
              onClick={() =>
                onOpen({
                  title: (
                    <Typography variant="subtitle1" mt={1}>
                      {item.title}
                    </Typography>
                  ),
                  content: (
                    <Box sx={{ px: 2 }}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        fontWeight="bold"
                      >
                        {formatDate(normalizeTodoDateToUtcMidnight(item.date))}
                      </Typography>
                      <Stack direction="row" mt={1} spacing={1}>
                        <Chip
                          color={
                            isCompleteStatus(item.progress)
                              ? "success"
                              : "warning"
                          }
                          variant="outlined"
                          label={item.progress}
                          size="small"
                        />
                        <Chip
                          color="secondary"
                          variant="outlined"
                          label={
                            CYCLE_LABELS[item.cycle as CycleType] ?? item.cycle
                          }
                          size="small"
                        />
                      </Stack>
                    </Box>
                  ),
                  footer: (
                    <Box display="flex" gap={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        loading={isDeletePending}
                        onClick={() => {
                          Bom.pipe(Bom.prop("id")(item), (id) => {
                            mutateDelete({ id });
                            onClose();
                          });
                        }}
                      >
                        삭제하기
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          resetForm({ title: item.title });
                          setEditCategory(item.category.id);
                          setEditOpen(true);
                        }}
                      >
                        수정하기
                      </Button>
                    </Box>
                  ),
                  height: "32%",
                })
              }
            >
              <MoreVert />
            </IconButton>
          </Stack>
        }
      >
        <ListItemButton
          sx={{
            px: 2.5,
            py: 0.75,
            "&:hover .reaction-trigger": { opacity: 1 },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Checkbox
              edge="start"
              size="small"
              tabIndex={-1}
              disableRipple
              disabled={isPending}
              checked={isCompleteStatus(item.progress)}
              onChange={() =>
                handleChangeCompleteStatus(item.id, item.progress)
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <span>{item.title}</span>
                {item.cycle !== "EVERYDAY" && (
                  <Chip
                    label={CYCLE_LABELS[item.cycle as CycleType] ?? item.cycle}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.6875rem",
                      bgcolor: "action.selected",
                    }}
                  />
                )}
              </Box>
            }
            slotProps={{
              primary: {
                sx: {
                  fontSize: "0.925rem",
                  textDecoration: isCompleteStatus(item.progress)
                    ? "line-through"
                    : "none",
                  color: isCompleteStatus(item.progress)
                    ? "text.disabled"
                    : "text.primary",
                  transition:
                    "color 0.2s ease, text-decoration-color 0.2s ease",
                },
              },
            }}
          />
          {!item.reaction && (
            <IconButton
              size="small"
              className="reaction-trigger"
              sx={{
                opacity: 0,
                transition: "opacity 0.15s ease",
                fontSize: "0.875rem",
                p: 0.5,
                mr: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setReactionAnchor(e.currentTarget);
              }}
            >
              😊
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>

      {/* 리액션 선택 Popover */}
      <Popover
        open={Boolean(reactionAnchor)}
        anchorEl={reactionAnchor}
        onClose={() => setReactionAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { sx: { p: 0.5, borderRadius: 2 } } }}
      >
        <Stack direction="row" spacing={0.25}>
          {REACTION_OPTIONS.map((emoji) => (
            <IconButton
              key={emoji}
              size="small"
              onClick={() => handleReaction(emoji)}
              sx={{
                fontSize: "1.25rem",
                "&:hover": { transform: "scale(1.2)" },
                transition: "transform 0.1s ease",
              }}
            >
              {emoji}
            </IconButton>
          ))}
        </Stack>
      </Popover>

      {/* 수정 Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>할 일 수정</DialogTitle>
        <DialogContent sx={{ pt: "12px !important" }}>
          <TextField
            fullWidth
            autoFocus
            variant="outlined"
            label="제목"
            size="small"
            sx={{ mb: 2 }}
            {...register("title")}
          />
          <TextField
            fullWidth
            select
            variant="outlined"
            label="카테고리"
            size="small"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          >
            {(categoriesData?.items ?? []).map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.title}
              </MenuItem>
            ))}
          </TextField>
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
            onClick={handleEditSubmit}
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
