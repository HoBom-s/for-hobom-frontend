import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import type { SpaceType } from "@/entities/wiki-space";

interface EditSpaceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { key: string; name: string; description: string }) => void;
  loading?: boolean;
  space: SpaceType | null;
}

export const EditSpaceDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  space,
}: EditSpaceDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (space && open) {
      setName(space.name);
      setDescription(space.description ?? "");
    }
  }, [space, open]);

  const handleSubmit = () => {
    if (!name.trim() || !space) return;
    onSubmit({
      key: space.key,
      name: name.trim(),
      description: description.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>스페이스 수정</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="스페이스 키"
            value={space?.key ?? ""}
            disabled
            helperText="스페이스 키는 변경할 수 없습니다"
          />
          <TextField
            autoFocus
            fullWidth
            label="스페이스 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          취소
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          loading={loading}
          disabled={!name.trim()}
        >
          수정
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
