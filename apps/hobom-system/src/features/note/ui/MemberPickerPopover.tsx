import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import type { UserType } from "@/entities/user";
import { getAvatarColor } from "@/shared/lib";

interface MemberPickerPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  members: UserType[];
  availableUsers: UserType[];
  isOwner: boolean;
  onAdd: (userId: string) => void;
  onRemove: (userId: string) => void;
}

export const MemberPickerPopover = ({
  anchorEl,
  onClose,
  members,
  availableUsers,
  isOwner,
  onAdd,
  onRemove,
}: MemberPickerPopoverProps) => {
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ minWidth: 260, maxHeight: 400 }}>
        <Typography
          variant="caption"
          fontWeight={600}
          sx={{ px: 2, pt: 1.5, pb: 0.5, display: "block" }}
        >
          공유 멤버
        </Typography>

        {members.length > 0 ? (
          <List dense disablePadding sx={{ maxHeight: 200, overflow: "auto" }}>
            {members.map((user) => (
              <ListItem
                key={user.id}
                secondaryAction={
                  isOwner ? (
                    <IconButton
                      edge="end"
                      size="small"
                      aria-label={`${user.nickname} 제거`}
                      onClick={() => onRemove(user.id)}
                    >
                      <CloseOutlined sx={{ fontSize: 16 }} />
                    </IconButton>
                  ) : null
                }
                sx={{ py: 0.5 }}
              >
                <ListItemAvatar sx={{ minWidth: 36 }}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: 12,
                      fontWeight: 700,
                      bgcolor: getAvatarColor(user.id),
                      color: "#fff",
                    }}
                  >
                    {user.nickname.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.nickname}
                  slotProps={{
                    primary: { fontSize: "0.8125rem", fontWeight: 500 },
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ px: 2, py: 1.5 }}
          >
            공유된 멤버가 없어요
          </Typography>
        )}

        {isOwner && (
          <Box
            sx={{
              px: 1.5,
              pt: 1,
              pb: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Autocomplete
              aria-label="멤버 검색"
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
                      width: 24,
                      height: 24,
                      fontSize: 11,
                      fontWeight: 700,
                      bgcolor: getAvatarColor(u.id),
                      color: "#fff",
                    }}
                  >
                    {u.nickname.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" fontSize="0.8125rem">
                    {u.nickname}
                  </Typography>
                </Box>
              )}
              onChange={(_, v) => {
                if (v) onAdd(v.id);
              }}
              value={null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="멤버 추가..."
                  size="small"
                  variant="outlined"
                />
              )}
              noOptionsText="검색 결과가 없어요"
              blurOnSelect
              clearOnBlur
            />
          </Box>
        )}
      </Box>
    </Popover>
  );
};
