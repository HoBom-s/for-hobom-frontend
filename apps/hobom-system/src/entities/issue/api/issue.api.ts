import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { issueSchema, issuesSchema } from "./issue.schema";
import type {
  IssueType,
  CreateIssueRequest,
  UpdateIssueRequest,
  TransitionIssueRequest,
  AssignIssueRequest,
} from "./issue.type";

export const fetchIssuesByProject = async (
  { projectId }: { projectId: string },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<IssueType[]>>(
    `/projects/${projectId}/issues`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(issuesSchema, "GET /projects/:projectId/issues")(res.items),
  };
};

export const fetchIssueById = async (
  {
    projectId,
    issueId,
  }: {
    projectId: string;
    issueId: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<IssueType>>(
    `/projects/${projectId}/issues/${issueId}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(issueSchema, "GET /projects/:projectId/issues/:issueId")(res.items),
  };
};

export const postCreateIssue = async ({
  projectId,
  ...data
}: { projectId: string } & CreateIssueRequest) => {
  return await httpClient.post<void>(`/projects/${projectId}/issues`, data);
};

export const patchUpdateIssue = async ({
  projectId,
  issueId,
  ...data
}: { projectId: string; issueId: string } & UpdateIssueRequest) => {
  return await httpClient.patch<void>(`/projects/${projectId}/issues/${issueId}`, data);
};

export const deleteIssue = async ({
  projectId,
  issueId,
}: {
  projectId: string;
  issueId: string;
}) => {
  return await httpClient.delete(`/projects/${projectId}/issues/${issueId}`);
};

export const postTransitionIssue = async ({
  projectId,
  issueId,
  ...data
}: { projectId: string; issueId: string } & TransitionIssueRequest) => {
  return await httpClient.post<void>(`/projects/${projectId}/issues/${issueId}/transition`, data);
};

export const patchAssignIssue = async ({
  projectId,
  issueId,
  ...data
}: { projectId: string; issueId: string } & AssignIssueRequest) => {
  return await httpClient.patch<void>(`/projects/${projectId}/issues/${issueId}/assignee`, data);
};
