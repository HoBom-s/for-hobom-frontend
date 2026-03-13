import { useMemo } from "react";
import {
  CalendarTodayOutlined,
  PeopleOutline,
  PersonAddOutlined,
  PersonRemoveOutlined,
  ShieldOutlined,
} from "hobom-design-system/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useOverlay } from "@/shared/model";
import {
  projectQueries,
  useAddMember,
  useRemoveMember,
} from "@/entities/project";
import { userQueries, type UserType } from "@/entities/user";
import { Hb } from "@/shared/ui";
import {
  ROLE_LABEL,
  ROLE_COLOR,
  getAvatarColor,
  formatDate,
} from "./project-settings-constants";
import { AddMemberDialog } from "./AddMemberDialog";
import { RemoveMemberDialog } from "./RemoveMemberDialog";

interface MemberSettingsSectionProps {
  projectId: string;
}

export const MemberSettingsSection = ({
  projectId,
}: MemberSettingsSectionProps) => {
  const { data } = useSuspenseQuery(projectQueries.detail(projectId));
  const project = data.items;

  const { data: usersData } = useSuspenseQuery(userQueries.list());
  const usersMap = useMemo(
    () => new Map(usersData.items.map((u: UserType) => [u.id, u])),
    [usersData.items],
  );

  const memberIds = new Set(project.members.map((m) => m.userId));
  const availableUsers = usersData.items.filter(
    (u: UserType) => !memberIds.has(u.id),
  );

  const { mutate: addMember, isPending: isAdding } = useAddMember();
  const { mutate: removeMember, isPending: isRemoving } = useRemoveMember();
  const { onOpen } = useOverlay();

  const handleAddMember = () => {
    onOpen(({ isOpen, onClose }) => (
      <AddMemberDialog
        isOpen={isOpen}
        onClose={onClose}
        availableUsers={availableUsers}
        isPending={isAdding}
        onAdd={(userId, role) => {
          addMember(
            { projectId, userId, role },
            { onSuccess: () => onClose() },
          );
        }}
      />
    ));
  };

  const handleRemoveMember = (userId: string, displayName: string) => {
    onOpen(({ isOpen, onClose }) => (
      <RemoveMemberDialog
        isOpen={isOpen}
        onClose={onClose}
        memberName={displayName}
        isPending={isRemoving}
        onConfirm={() => {
          removeMember({ projectId, userId }, { onSuccess: () => onClose() });
        }}
      />
    ));
  };

  return (
    <Hb.Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Hb.Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "action.hover",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PeopleOutline sx={{ fontSize: 18, color: "text.secondary" }} />
          <Hb.Text variant="subtitle2" fontWeight={700}>
            멤버
          </Hb.Text>
          <Hb.Chip
            label={project.members.length}
            size="small"
            sx={{
              height: 20,
              minWidth: 20,
              fontSize: 11,
              fontWeight: 700,
              bgcolor: "rgba(var(--mui-palette-primary-mainChannel) / 0.1)",
              color: "primary.main",
            }}
          />
        </Hb.Box>
        <Hb.Button
          variant="primary"
          size="small"
          startIcon={<PersonAddOutlined />}
          onClick={handleAddMember}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            borderRadius: 2,
            fontSize: 12,
          }}
        >
          멤버 추가
        </Hb.Button>
      </Hb.Box>
      <Hb.Box sx={{ p: 0 }}>
        {project.members.length === 0 ? (
          <Hb.Box sx={{ py: 6, textAlign: "center" }}>
            <PeopleOutline
              sx={{ fontSize: 48, color: "action.disabled", mb: 1 }}
            />
            <Hb.Text variant="body2" color="text.disabled">
              멤버가 없어요
            </Hb.Text>
          </Hb.Box>
        ) : (
          <Hb.Stack divider={<Hb.Divider />}>
            {project.members.map((member) => {
              const user = usersMap.get(member.userId);
              const displayName =
                user?.nickname ?? user?.username ?? member.userId;
              const avatarColor = getAvatarColor(member.userId);
              const roleLabel = ROLE_LABEL[member.role] ?? member.role;
              const roleColor = ROLE_COLOR[member.role] ?? "#6b7280";

              return (
                <Hb.Box
                  key={member.userId}
                  sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    "&:hover": { bgcolor: "#f8f9fa" },
                    transition: "background-color 0.15s",
                  }}
                >
                  <Hb.Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      fontSize: 14,
                      fontWeight: 700,
                      bgcolor: avatarColor,
                      color: "#fff",
                    }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </Hb.Avatar>
                  <Hb.Box sx={{ flex: 1, minWidth: 0 }}>
                    <Hb.Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Hb.Text variant="body2" fontWeight={600} noWrap>
                        {displayName}
                      </Hb.Text>
                      <Hb.Chip
                        icon={
                          <ShieldOutlined
                            sx={{ fontSize: "13px !important" }}
                          />
                        }
                        label={roleLabel}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: 11,
                          fontWeight: 600,
                          bgcolor: `${roleColor}14`,
                          color: roleColor,
                          "& .MuiChip-icon": { color: roleColor },
                        }}
                      />
                    </Hb.Box>
                    <Hb.Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {user?.email && (
                        <Hb.Text variant="caption" color="text.secondary">
                          {user.email}
                        </Hb.Text>
                      )}
                      <Hb.Tooltip title="참여일" arrow>
                        <Hb.Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.3,
                          }}
                        >
                          <CalendarTodayOutlined
                            sx={{ fontSize: 11, color: "text.disabled" }}
                          />
                          <Hb.Text variant="caption" color="text.disabled">
                            {formatDate(member.joinedAt)}
                          </Hb.Text>
                        </Hb.Box>
                      </Hb.Tooltip>
                    </Hb.Box>
                  </Hb.Box>
                  <Hb.Tooltip title="멤버 제거">
                    <Hb.Button.Icon
                      size="small"
                      onClick={() =>
                        handleRemoveMember(member.userId, displayName)
                      }
                      sx={{
                        color: "text.disabled",
                        "&:hover": { color: "error.main" },
                      }}
                    >
                      <PersonRemoveOutlined sx={{ fontSize: 18 }} />
                    </Hb.Button.Icon>
                  </Hb.Tooltip>
                </Hb.Box>
              );
            })}
          </Hb.Stack>
        )}
      </Hb.Box>
    </Hb.Paper>
  );
};
