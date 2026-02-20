import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {
  type DailyTodoWithCategoryType,
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

export const DailyTodoAddButton = ({ item }: Props) => {
  const { register, watch, reset } = useForm<{ title: string }>({
    mode: "onChange",
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
                {...register("title")}
              />
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
                      mutate({ title: t, category: categoryId, date });
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
