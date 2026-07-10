import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  ProjectLabelType,
  CreateProjectLabelRequest,
  UpdateProjectLabelRequest,
} from "./project-label.type";

export const fetchProjectLabels = async (
  { projectId }: { projectId: string },
  signal?: AbortSignal,
) => {
  return await httpClient.get<HttpResponseType<ProjectLabelType[]>>(
    `/projects/${projectId}/labels`,
    { signal },
  );
};

export const postCreateProjectLabel = async ({
  projectId,
  ...data
}: { projectId: string } & CreateProjectLabelRequest) => {
  return await httpClient.post<void>(`/projects/${projectId}/labels`, data);
};

export const patchUpdateProjectLabel = async ({
  projectId,
  labelId,
  ...data
}: { projectId: string; labelId: string } & UpdateProjectLabelRequest) => {
  return await httpClient.patch<void>(`/projects/${projectId}/labels/${labelId}`, data);
};

export const deleteProjectLabel = async ({
  projectId,
  labelId,
}: {
  projectId: string;
  labelId: string;
}) => {
  return await httpClient.delete<void>(`/projects/${projectId}/labels/${labelId}`);
};
