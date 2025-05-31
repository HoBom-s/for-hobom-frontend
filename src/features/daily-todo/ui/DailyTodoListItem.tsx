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
  type DailyTodoType,
  type ProgressType,
} from "@/features/daily-todo/api";
import {
  changeCompleteStatus,
  isCompleteStatus,
  useChangeDailyTodoCompleteStatus,
} from "@/features/daily-todo/model";
import {
  formatDate,
  normalizeTodoDateToUtcMidnight,
} from "@/features/daily-todo/lib";
import { Bom } from "@/packages/bom";
import { useBottomSheetCTA } from "@/shared/bottom-sheet-cta/model";

interface Props {
  item: DailyTodoType;
}

export const DailyTodoListItem = ({ item }: Props) => {
  const { mutate, isPending } = useChangeDailyTodoCompleteStatus(item);
  const { onOpen } = useBottomSheetCTA();

  const handleChangeCompleteStatus = (id: string, status: ProgressType) => {
    Bom.pipe(status, changeCompleteStatus, (newStatus) =>
      mutate({ id, status: newStatus }),
    );
  };

  return (
    <ListItem
      sx={{ height: 40 }}
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
                  <Button fullWidth variant="contained" color="error">
                    Delete
                  </Button>
                  <Button fullWidth variant="contained" color="primary">
                    Edit
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
      <ListItemButton dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            disabled={isPending}
            checked={isCompleteStatus(item.progress)}
            onChange={() => handleChangeCompleteStatus(item.id, item.progress)}
          />
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};
