import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { Bom } from "@/packages/bom";
import { useUpdateCategory, useDeleteCategory } from "@/entities/daily-todo";

interface Props {
  categoryId: string;
  categoryTitle: string;
}

export const CategoryMenu = ({ categoryId, categoryTitle }: Props) => {
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
