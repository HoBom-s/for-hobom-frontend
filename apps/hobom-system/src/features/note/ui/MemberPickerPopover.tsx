import { CloseOutlined } from "hobom-design-system/icons";
import type { UserType } from "@/entities/user";
import { getAvatarColor } from "@/shared/lib";
import { Hb } from "@/shared/ui";

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
    <Hb.Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Hb.Box
        style={{
          minWidth: 260,
          maxHeight: 400,
        }}
      >
        <Hb.Text
          variant="caption"
          fontWeight={600}
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 12,
            paddingBottom: 4,
            display: "block",
          }}
        >
          공유 멤버
        </Hb.Text>

        {members.length > 0 ? (
          <Hb.List.Root dense disablePadding sx={{ maxHeight: 200, overflow: "auto" }}>
            {members.map((user) => (
              <Hb.List.Item
                key={user.id}
                secondaryAction={
                  isOwner ? (
                    <Hb.Button.Icon
                      edge="end"
                      size="small"
                      aria-label={`${user.nickname} 제거`}
                      onClick={() => onRemove(user.id)}
                    >
                      <CloseOutlined sx={{ fontSize: 16 }} />
                    </Hb.Button.Icon>
                  ) : null
                }
                sx={{ py: 0.5 }}
              >
                <Hb.List.ItemAvatar sx={{ minWidth: 36 }}>
                  <Hb.Avatar
                    style={{
                      width: 28,
                      height: 28,
                      fontSize: 12,
                      fontWeight: 700,
                      backgroundColor: getAvatarColor(user.id),
                      color: "#fff",
                    }}
                  >
                    {user.nickname.charAt(0).toUpperCase()}
                  </Hb.Avatar>
                </Hb.List.ItemAvatar>
                <Hb.List.ItemText
                  primary={user.nickname}
                  slotProps={{
                    primary: { fontSize: "0.8125rem", fontWeight: 500 },
                  }}
                />
              </Hb.List.Item>
            ))}
          </Hb.List.Root>
        ) : (
          <Hb.Text
            variant="body2"
            color="text.disabled"
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 12,
              paddingBottom: 12,
            }}
          >
            공유된 멤버가 없어요
          </Hb.Text>
        )}

        {isOwner && (
          <Hb.Box
            style={{
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 8,
              paddingBottom: 12,
              borderTop: "1px solid",
              borderColor: "var(--hb-color-border)",
            }}
          >
            <Hb.Autocomplete
              aria-label="멤버 검색"
              options={availableUsers}
              getOptionLabel={(u) => `${u.nickname} (${u.username})`}
              renderOption={(props, u) => (
                <Hb.Box
                  component="li"
                  {...props}
                  key={u.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <Hb.Avatar
                    style={{
                      width: 24,
                      height: 24,
                      fontSize: 11,
                      fontWeight: 700,
                      backgroundColor: getAvatarColor(u.id),
                      color: "#fff",
                    }}
                  >
                    {u.nickname.charAt(0).toUpperCase()}
                  </Hb.Avatar>
                  <Hb.Text variant="body2" style={{ fontSize: "0.8125rem" }}>
                    {u.nickname}
                  </Hb.Text>
                </Hb.Box>
              )}
              onChange={(_, v) => {
                if (v) onAdd(v.id);
              }}
              value={null}
              renderInput={(params) => (
                <Hb.TextField {...params} placeholder="멤버 추가..." size="small" />
              )}
              noOptionsText="검색 결과가 없어요"
              blurOnSelect
              clearOnBlur
            />
          </Hb.Box>
        )}
      </Hb.Box>
    </Hb.Popover>
  );
};
