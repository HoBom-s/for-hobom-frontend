import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  formatDate,
  normalizeTodoDateToUtcMidnight,
  changeCompleteStatus,
  isCompleteStatus,
  useChangeDailyTodoCompleteStatus,
  useDeleteDailyTodo,
  useUpdateDailyTodoReaction,
  CYCLE_LABELS,
  type DailyTodoType,
  type ProgressType,
  type CycleType,
} from "@/entities/daily-todo";
import { Bom } from "@/packages/bom";
import { useBottomSheetCTA } from "@/shared/model";
import { DailyTodoReactionPopover } from "./DailyTodoReactionPopover";
import { DailyTodoEditDialog } from "./DailyTodoEditDialog";

interface Props {
  item: DailyTodoType;
}

export const DailyTodoListItem = ({ item }: Props) => {
  const { mutate, isPending } = useChangeDailyTodoCompleteStatus(item);
  const { mutate: mutateDelete, isPending: isDeletePending } =
    useDeleteDailyTodo();
  const { mutate: mutateReaction } = useUpdateDailyTodoReaction();
  const { onOpen, onClose } = useBottomSheetCTA();

  const [editOpen, setEditOpen] = useState(false);
  const [reactionAnchor, setReactionAnchor] = useState<HTMLElement | null>(
    null,
  );

  const handleChangeCompleteStatus = (id: string, status: ProgressType) => {
    Bom.pipe(status, changeCompleteStatus, (newStatus) =>
      mutate({ id, status: newStatus }),
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
                          mutateDelete({ id: item.id });
                          onClose();
                        }}
                      >
                        삭제하기
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => setEditOpen(true)}
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

      <DailyTodoReactionPopover
        anchorEl={reactionAnchor}
        onClose={() => setReactionAnchor(null)}
        onSelect={handleReaction}
      />

      <DailyTodoEditDialog
        item={item}
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          onClose();
        }}
      />
    </>
  );
};
