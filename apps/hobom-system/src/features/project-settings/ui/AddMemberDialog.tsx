import { useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { UserType } from "@/entities/user";
import { getAvatarColor, ROLE_LABEL } from "./project-settings-constants";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  availableUsers: UserType[];
  onAdd: (userId: string, role: string) => void;
  isPending: boolean;
}

export const AddMemberDialog = ({
  isOpen,
  onClose,
  availableUsers,
  onAdd,
  isPending,
}: AddMemberDialogProps) => {
  const [selected, setSelected] = useState<UserType | null>(null);
  const [role, setRole] = useState("MEMBER");

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>멤버 추가</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={availableUsers}
          getOptionLabel={(u) => `${u.nickname} (${u.username})`}
          renderOption={(props, u) => (
            <Box
              component="li"
              {...props}
              key={u.id}
              sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: 12,
                  fontWeight: 700,
                  bgcolor: getAvatarColor(u.id),
                  color: "#fff",
                }}
              >
                {u.nickname.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ lineHeight: 1.3 }}
                >
                  {u.nickname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {u.email}
                </Typography>
              </Box>
            </Box>
          )}
          value={selected}
          onChange={(_, v) => setSelected(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="사용자 검색"
              size="small"
              placeholder="이름 또는 아이디로 검색"
              sx={{ mt: 1 }}
            />
          )}
          noOptionsText="검색 결과가 없어요"
        />
        <FormControl size="small" fullWidth sx={{ mt: 2 }}>
          <InputLabel>역할</InputLabel>
          <Select
            value={role}
            label="역할"
            onChange={(e) => setRole(e.target.value)}
          >
            {Object.entries(ROLE_LABEL).map(([k, label]) => (
              <MenuItem key={k} value={k}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="contained"
          disabled={!selected}
          loading={isPending}
          onClick={() => {
            if (selected) onAdd(selected.id, role);
          }}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};
