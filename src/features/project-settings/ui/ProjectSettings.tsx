import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteOutline,
  PeopleOutline,
  PersonAddOutlined,
  PersonRemoveOutlined,
  SettingsOutlined,
  ShieldOutlined,
  CalendarTodayOutlined,
} from "@mui/icons-material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useOverlay } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import {
  projectQueries,
  useUpdateProject,
  useDeleteProject,
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
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { AddMemberDialog } from "./AddMemberDialog";
import { RemoveMemberDialog } from "./RemoveMemberDialog";

interface ProjectSettingsProps {
  projectId: string;
}

export const ProjectSettings = ({ projectId }: ProjectSettingsProps) => {
  const navigate = useNavigate();
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

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description ?? "");

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const { mutate: addMember, isPending: isAdding } = useAddMember();
  const { mutate: removeMember, isPending: isRemoving } = useRemoveMember();
  const { onOpen } = useOverlay();

  const handleSave = () => {
    if (!name.trim()) return;
    updateProject({
      id: projectId,
      name: name.trim(),
      description: description || undefined,
    });
  };

  const handleDelete = () => {
    onOpen(({ isOpen, onClose }) => (
      <DeleteConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        projectName={project.name}
        isPending={isDeleting}
        onConfirm={() => {
          deleteProject(
            { id: projectId },
            {
              onSuccess: () => {
                onClose();
                navigate(RoutesConfig.PROJECTS.LIST);
              },
            },
          );
        }}
      />
    ));
  };

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

  const isDirty =
    name.trim() !== project.name ||
    (description || undefined) !== (project.description || undefined);

  return (
    <Box
      sx={{
        maxWidth: 720,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* 헤더 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: "#4680ff",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {project.key.charAt(0)}
        </Avatar>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              {project.name}
            </Typography>
            <Chip
              label={project.key}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 700,
                bgcolor: "#4680ff18",
                color: "#4680ff",
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            프로젝트 설정을 관리합니다
          </Typography>
        </Box>
      </Box>

      {/* 일반 설정 */}
      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "#f8f9fa",
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SettingsOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="subtitle2" fontWeight={700}>
            일반
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="프로젝트 키"
            value={project.key}
            size="small"
            fullWidth
            disabled
            helperText="프로젝트 키는 변경할 수 없어요"
          />
          <TextField
            label="프로젝트 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            fullWidth
            multiline
            rows={3}
            placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!isDirty || !name.trim()}
              loading={isUpdating}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
                borderRadius: 2,
                px: 3,
              }}
            >
              변경사항 저장
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 멤버 */}
      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "#f8f9fa",
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
                bgcolor: "#4680ff18",
                color: "#4680ff",
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
              <PeopleOutline sx={{ fontSize: 48, color: "#dadce0", mb: 1 }} />
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

      {/* 위험 구역 */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          borderColor: "error.light",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "#fef2f2",
            borderBottom: "1px solid",
            borderColor: "error.light",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <DeleteOutline sx={{ fontSize: 18, color: "error.main" }} />
          <Typography variant="subtitle2" fontWeight={700} color="error.main">
            위험 구역
          </Typography>
        </Box>
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="body2" fontWeight={600}>
              프로젝트 삭제
            </Typography>
            <Typography variant="caption" color="text.secondary">
              프로젝트와 관련된 모든 데이터가 영구적으로 삭제됩니다
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteOutline />}
            onClick={handleDelete}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              flexShrink: 0,
            }}
          >
            프로젝트 삭제
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
