import { httpClient } from "@/shared/api";
import type { UpdateWorkflowRequest } from "./workflow.type";

export const putUpdateWorkflow = async ({
  projectId,
  ...data
}: { projectId: string } & UpdateWorkflowRequest) => {
  return await httpClient.put<void>(`/projects/${projectId}/workflow`, data);
};
