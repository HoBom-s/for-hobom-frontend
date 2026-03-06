import { Suspense, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import {
  useProjectList,
  ProjectGrid,
  CreateProjectDialog,
} from "@/features/project-list";
import { SuspenseLoader } from "@/shared/ui";

const ProjectListContent = () => {
  const { projects } = useProjectList();
  return <ProjectGrid projects={projects} />;
};

export const ProjectListWorkspace = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
            프로젝트
          </Typography>
          <Typography variant="body2" color="text.secondary">
            팀의 프로젝트를 관리하고 이슈를 추적하세요.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => setDialogOpen(true)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { boxShadow: "0 2px 8px rgba(70,128,255,0.3)" },
          }}
        >
          새 프로젝트
        </Button>
      </Box>

      <Suspense fallback={<SuspenseLoader />}>
        <ProjectListContent />
      </Suspense>

      <CreateProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  );
};
