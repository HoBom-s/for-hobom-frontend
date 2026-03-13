import { useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CalendarTodayOutlined,
  PeopleOutline,
  PersonAddOutlined,
  PersonRemoveOutlined,
  ShieldOutlined,
} from "@mui/icons-material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useOverlay } from "@/shared/model";
import {
  projectQueries,
  useAddMember,
  useRemoveMember,
} from "@/entities/project";
import { userQueries, type UserType } from "@/entities/user";
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
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PeopleOutline sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="subtitle2" fontWeight={700}>
            멤버
          </Typography>
          <Chip
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
        </Box>
        <Button
          variant="contained"
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
        </Button>
      </Box>
      <Box sx={{ p: 0 }}>
        {project.members.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <PeopleOutline
              sx={{ fontSize: 48, color: "action.disabled", mb: 1 }}
            />
            <Typography variant="body2" color="text.disabled">
              멤버가 없어요
            </Typography>
          </Box>
        ) : (
          <Stack divider={<Divider />}>
            {project.members.map((member) => {
              const user = usersMap.get(member.userId);
              const displayName =
                user?.nickname ?? user?.username ?? member.userId;
              const avatarColor = getAvatarColor(member.userId);
              const roleLabel = ROLE_LABEL[member.role] ?? member.role;
              const roleColor = ROLE_COLOR[member.role] ?? "#6b7280";

              return (
                <Box
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
                  <Avatar
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
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {displayName}
                      </Typography>
                      <Chip
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
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {user?.email && (
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      )}
                      <Tooltip title="참여일" arrow>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.3,
                          }}
                        >
                          <CalendarTodayOutlined
                            sx={{ fontSize: 11, color: "text.disabled" }}
                          />
                          <Typography variant="caption" color="text.disabled">
                            {formatDate(member.joinedAt)}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Tooltip title="멤버 제거">
                    <IconButton
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
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>
    </Paper>
  );
};
