import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { ProjectSettings } from "@/features/project-settings";

export const ProjectSettingsWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) return null;

  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <ProjectSettings projectId={projectId} />
    </Suspense>
  );
};
