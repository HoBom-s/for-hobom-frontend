import { Suspense, useState } from "react";
import { AddOutlined } from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import { useProjectList, ProjectGrid, CreateProjectDialog } from "@/features/project-list";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";

const styles = stylex.create({
  createButton: {
    borderRadius: 16,
    textTransform: "none",
    fontWeight: 600,
    boxShadow: "none",
    ":hover": { boxShadow: "0 2px 8px rgba(70,128,255,0.3)" },
  },
});

const ProjectListContent = () => {
  const { projects } = useProjectList();

  return <ProjectGrid projects={projects} />;
};

export const ProjectListWorkspace = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Hb.Box
      style={{
        padding: 24,
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <Hb.Box>
          <Hb.Text
            variant="h5"
            fontWeight={700}
            style={{
              marginBottom: 4,
            }}
          >
            프로젝트
          </Hb.Text>
          <Hb.Text variant="body2" color="text.secondary">
            팀의 프로젝트를 관리하고 이슈를 추적하세요.
          </Hb.Text>
        </Hb.Box>
        <Hb.Button
          variant="primary"
          startIcon={<AddOutlined />}
          onClick={() => setDialogOpen(true)}
          {...stylex.props(styles.createButton)}
        >
          새 프로젝트
        </Hb.Button>
      </Hb.Box>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <ProjectListContent />
        </Suspense>
      </ErrorBoundary>
      <CreateProjectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Hb.Box>
  );
};
