import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { projectSchema, projectsSchema } from "./project.schema";
import type { ProjectType, CreateProjectRequest, UpdateProjectRequest } from "./project.type";

export const fetchProjects = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<ProjectType[]>>("/projects/me", { signal });

  return { ...res, items: parseResponse(projectsSchema, "GET /projects/me")(res.items) };
};

export const fetchProjectById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<ProjectType>>(`/projects/${id}`, { signal });

  return { ...res, items: parseResponse(projectSchema, "GET /projects/:id")(res.items) };
};

export const postCreateProject = async (data: CreateProjectRequest) => {
  return await httpClient.post<void>("/projects", data);
};

export const patchUpdateProject = async ({
  id,
  ...data
}: { id: string } & UpdateProjectRequest) => {
  return await httpClient.patch<void>(`/projects/${id}`, data);
};

export const deleteProject = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/projects/${id}`);
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
  return await httpClient.post<void>(`/projects/${projectId}/members`, {
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
  return await httpClient.delete(`/projects/${projectId}/members/${userId}`);
};
