import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  ProjectType,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "./project.type";

export const fetchProjects = async () => {
  return await httpClient.get<HttpResponseType<ProjectType[]>>(
    "/api/projects/me",
  );
};

export const fetchProjectById = async ({ id }: { id: string }) => {
  return await httpClient.get<HttpResponseType<ProjectType>>(
    `/api/projects/${id}`,
  );
};

export const postCreateProject = async (data: CreateProjectRequest) => {
  return await httpClient.post<void>("/api/projects", data);
};

export const patchUpdateProject = async ({
  id,
  ...data
}: { id: string } & UpdateProjectRequest) => {
  return await httpClient.patch<void>(`/api/projects/${id}`, data);
};

export const deleteProject = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/api/projects/${id}`);
};

export const postAddMember = async ({
  projectId,
  userId,
  role,
}: {
  projectId: string;
  userId: string;
  role: string;
}) => {
  return await httpClient.post<void>(`/api/projects/${projectId}/members`, {
    userId,
    role,
  });
};

export const deleteRemoveMember = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
  return await httpClient.delete(
    `/api/projects/${projectId}/members/${userId}`,
  );
};
