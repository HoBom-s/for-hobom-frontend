import { useState } from "react";
import type { UserType } from "@/entities/user";
import { Hb } from "@/shared/ui";
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
    <Hb.Dialog.Root open={isOpen} onClose={onClose} size="xs">
      <Hb.Dialog.Title>멤버 추가</Hb.Dialog.Title>
      <Hb.Dialog.Content>
        <Hb.Autocomplete
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
                  width: 28,
                  height: 28,
                  fontSize: 12,
                  fontWeight: 700,
                  backgroundColor: getAvatarColor(u.id),
                  color: "#fff",
                }}
              >
                {u.nickname.charAt(0).toUpperCase()}
              </Hb.Avatar>
              <Hb.Box>
                <Hb.Text
                  variant="body2"
                  fontWeight={600}
                  style={{
                    lineHeight: 1.3,
                  }}
                >
                  {u.nickname}
                </Hb.Text>
                <Hb.Text variant="caption" color="text.secondary">
                  {u.email}
                </Hb.Text>
              </Hb.Box>
            </Hb.Box>
          )}
          value={selected}
          onChange={(_, v) => setSelected(v)}
          renderInput={(params) => (
            <Hb.TextField
              {...params}
              label="사용자 검색"
              size="small"
              placeholder="이름 또는 아이디로 검색"
              sx={{ mt: 1 }}
            />
          )}
          noOptionsText="검색 결과가 없어요"
        />
        <Hb.Form.Control size="small" fullWidth sx={{ mt: 2 }}>
          <Hb.Form.Label>역할</Hb.Form.Label>
          <Hb.Form.Select value={role} label="역할" onChange={(e) => setRole(e.target.value)}>
            {Object.entries(ROLE_LABEL).map(([k, label]) => (
              <Hb.Menu.Item key={k} value={k}>
                {label}
              </Hb.Menu.Item>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions sx={{ px: 3, pb: 2 }}>
        <Hb.Button variant="secondary" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button
          variant="primary"
          disabled={!selected}
          loading={isPending}
          onClick={() => {
            if (selected) onAdd(selected.id, role);
          }}
        >
          추가
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
