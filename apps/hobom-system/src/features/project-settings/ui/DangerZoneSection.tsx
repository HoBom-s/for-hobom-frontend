import { DeleteOutline } from "hobom-design-system/icons";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "hobom-data";
import { useOverlay } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import { Hb, ConfirmDialog } from "@/shared/ui";
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
    <Hb.Paper
      variant="outlined"
      style={{
        borderRadius: 16,
        overflow: "hidden",
        borderColor: "var(--hb-color-danger)",
      }}
    >
      <Hb.Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "rgba(var(--mui-palette-error-mainChannel) / 0.06)",
          borderBottom: "1px solid",
          borderColor: "error.light",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <DeleteOutline sx={{ fontSize: 18, color: "error.main" }} />
        <Hb.Text variant="subtitle2" fontWeight={700} color="error.main">
          위험 구역
        </Hb.Text>
      </Hb.Box>
      <Hb.Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Hb.Box>
          <Hb.Text variant="body2" fontWeight={600}>
            프로젝트 삭제
          </Hb.Text>
          <Hb.Text variant="caption" color="text.secondary">
            프로젝트와 관련된 모든 데이터가 영구적으로 삭제됩니다
          </Hb.Text>
        </Hb.Box>
        <Hb.Button
          variant="danger"
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
        </Hb.Button>
      </Hb.Box>
    </Hb.Paper>
  );
};
