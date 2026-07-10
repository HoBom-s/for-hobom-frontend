import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type { SprintType, CreateSprintRequest, UpdateSprintRequest } from "./sprint.type";

export const fetchSprintsByProject = async (
  { projectId }: { projectId: string },
  signal?: AbortSignal,
) => {
  return await httpClient.get<HttpResponseType<SprintType[]>>(`/projects/${projectId}/sprints`, {
    signal,
  });
};

export const postCreateSprint = async ({
  projectId,
  ...data
}: { projectId: string } & CreateSprintRequest) => {
  return await httpClient.post<void>(`/projects/${projectId}/sprints`, data);
};

export const patchUpdateSprint = async ({
  projectId,
  sprintId,
  ...data
}: { projectId: string; sprintId: string } & UpdateSprintRequest) => {
  return await httpClient.patch<void>(`/projects/${projectId}/sprints/${sprintId}`, data);
};

export const deleteSprint = async ({
  projectId,
  sprintId,
}: {
  projectId: string;
  sprintId: string;
}) => {
  return await httpClient.delete(`/projects/${projectId}/sprints/${sprintId}`);
};

export const postStartSprint = async ({
  projectId,
  sprintId,
}: {
  projectId: string;
  sprintId: string;
}) => {
  return await httpClient.post<void>(`/projects/${projectId}/sprints/${sprintId}/start`, {});
};

export const postCompleteSprint = async ({
  projectId,
  sprintId,
}: {
  projectId: string;
  sprintId: string;
}) => {
  return await httpClient.post<void>(`/projects/${projectId}/sprints/${sprintId}/complete`, {});
};
