import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { SuspenseLoader } from "@/shared/ui";
import { ProjectSettings } from "@/features/project-settings";

export const ProjectSettingsWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) return null;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProjectSettings projectId={projectId} />
    </Suspense>
  );
};
