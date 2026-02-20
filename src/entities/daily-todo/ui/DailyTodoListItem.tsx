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
  type DailyTodoType,
  type ProgressType,
  useDeleteDailyTodo,
} from "@/entities/daily-todo";
import { Bom } from "@/packages/bom";
import { useBottomSheetCTA } from "@/shared/model";

interface Props {
  item: DailyTodoType;
}

export const DailyTodoListItem = ({ item }: Props) => {
  const { mutate, isPending } = useChangeDailyTodoCompleteStatus(item);
  const { mutate: mutateDelete, isPending: isDeletePending } =
    useDeleteDailyTodo();
  const { onOpen, onClose } = useBottomSheetCTA();

  const handleChangeCompleteStatus = (id: string, status: ProgressType) => {
    Bom.pipe(status, changeCompleteStatus, (newStatus) =>
      mutate({ id, status: newStatus }),
    );
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
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
                        isCompleteStatus(item.progress) ? "success" : "warning"
                      }
                      variant="outlined"
                      label={item.progress}
                      size="small"
                    />
                    <Chip
                      color="secondary"
                      variant="outlined"
                      label={item.cycle}
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
                    disabled
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
      }
    >
      <ListItemButton sx={{ px: 2.5, py: 0.75 }}>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <Checkbox
            edge="start"
            size="small"
            tabIndex={-1}
            disableRipple
            disabled={isPending}
            checked={isCompleteStatus(item.progress)}
            onChange={() => handleChangeCompleteStatus(item.id, item.progress)}
          />
        </ListItemIcon>
        <ListItemText
          primary={item.title}
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
              },
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
