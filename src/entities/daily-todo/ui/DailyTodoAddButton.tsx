import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {
  type DailyTodoWithCategoryType,
  type CycleType,
  DailyTodoCycleModel,
  CYCLE_LABELS,
  formatDate,
  getNow,
  getSelectedDate,
  useCreateDailyTodo,
} from "@/entities/daily-todo";
import { useOverlay } from "@/shared/model";
import { Bom } from "@/packages/bom";
import { useRouterQuery } from "@/shared/model";
import { useToast } from "@/shared/model";

interface Props {
  item: DailyTodoWithCategoryType;
}

const CYCLE_OPTIONS = Object.keys(DailyTodoCycleModel) as CycleType[];

export const DailyTodoAddButton = ({ item }: Props) => {
  const { register, watch, reset, setValue } = useForm<{
    title: string;
    cycle: CycleType;
  }>({
    mode: "onChange",
    defaultValues: { cycle: "EVERYDAY" },
  });
  const { openWarnToast } = useToast();
  const { query } = useRouterQuery();
  const { onOpen } = useOverlay();
  const { mutate, isPending } = useCreateDailyTodo();

  return (
    <IconButton
      size="small"
      onClick={() => {
        onOpen(({ isOpen, onClose }) => (
          <Dialog
            open={isOpen}
            onClose={() => {
              reset();
              onClose();
            }}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle sx={{ pb: 1 }}>
              할 일 추가
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {item.categoryTitle}
              </Typography>
            </DialogTitle>
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
                label="반복 주기"
                size="small"
                value={watch("cycle")}
                onChange={(e) => setValue("cycle", e.target.value as CycleType)}
              >
                {CYCLE_OPTIONS.map((key) => (
                  <MenuItem key={key} value={key}>
                    {CYCLE_LABELS[key]}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                취소
              </Button>
              <Button
                fullWidth
                variant="contained"
                loading={isPending}
                onClick={() => {
                  const title = watch("title");
                  Bom.pipe(
                    title.trim(),
                    (t) => {
                      if (Bom.isEmpty(t)) {
                        openWarnToast({ message: "제목을 입력해주세요." });
                        return null;
                      }
                      return t;
                    },
                    (t) => {
                      if (t == null) return;
                      const now = getNow();
                      const date = Bom.pipe(
                        getSelectedDate(query, now),
                        formatDate,
                      );
                      const categoryId = Bom.prop("categoryId")(item);
                      const cycle = watch("cycle");
                      mutate({
                        title: t,
                        category: categoryId,
                        date,
                        ...(cycle !== "EVERYDAY" && { cycle }),
                      });
                      reset();
                      onClose();
                    },
                  );
                }}
              >
                추가
              </Button>
            </DialogActions>
          </Dialog>
        ));
      }}
    >
      <AddCircle fontSize="small" />
    </IconButton>
  );
};
