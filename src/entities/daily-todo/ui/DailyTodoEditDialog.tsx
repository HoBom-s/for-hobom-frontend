import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { Bom } from "@/packages/bom";
import {
  todoQueries,
  useUpdateDailyTodo,
  type DailyTodoType,
} from "@/entities/daily-todo";

interface Props {
  item: DailyTodoType;
  open: boolean;
  onClose: () => void;
}

export const DailyTodoEditDialog = ({ item, open, onClose }: Props) => {
  const { register, watch } = useForm<{ title: string }>({
    defaultValues: { title: item.title },
  });
  const [editCategory, setEditCategory] = useState(item.category.id);
  const { mutate, isPending } = useUpdateDailyTodo();
  const { data: categoriesData } = useQuery({
    ...todoQueries.categories(),
    enabled: open,
  });

  const handleSubmit = () => {
    const title = watch("title").trim();
    if (Bom.isEmpty(title)) return;
    mutate(
      { id: item.id, title, category: editCategory },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
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
        <Button fullWidth variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          fullWidth
          variant="contained"
          loading={isPending}
          onClick={handleSubmit}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};
