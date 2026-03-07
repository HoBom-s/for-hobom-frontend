import { Box, Button, Paper, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useOverlay } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import { ConfirmDialog } from "@/shared/ui";
import { projectQueries, useDeleteProject } from "@/entities/project";

interface DangerZoneSectionProps {
  projectId: string;
}

export const DangerZoneSection = ({ projectId }: DangerZoneSectionProps) => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(projectQueries.detail(projectId));
  const project = data.items;

  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const { onOpen } = useOverlay();

  const handleDelete = () => {
    onOpen(({ isOpen, onClose }) => (
      <ConfirmDialog
        open={isOpen}
        onClose={onClose}
        title="프로젝트 삭제"
        description={
          <>
            <strong>"{project.name}"</strong> 프로젝트를 삭제하시겠어요?
            <br />이 작업은 되돌릴 수 없으며, 모든 이슈와 스프린트가 삭제돼요.
          </>
        }
        confirmLabel="삭제"
        confirmColor="error"
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

  return (
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
  );
};
