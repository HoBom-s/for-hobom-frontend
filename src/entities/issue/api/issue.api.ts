import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  IssueType,
  CreateIssueRequest,
  UpdateIssueRequest,
  TransitionIssueRequest,
  AssignIssueRequest,
} from "./issue.type";

export const fetchIssuesByProject = async ({
  projectId,
}: {
  projectId: string;
}) => {
  return await httpClient.get<HttpResponseType<IssueType[]>>(
    `/api/projects/${projectId}/issues`,
  );
};

export const fetchIssueById = async ({
  projectId,
  issueId,
}: {
  projectId: string;
  issueId: string;
}) => {
  return await httpClient.get<HttpResponseType<IssueType>>(
    `/api/projects/${projectId}/issues/${issueId}`,
  );
};

export const postCreateIssue = async ({
  projectId,
  ...data
}: { projectId: string } & CreateIssueRequest) => {
  return await httpClient.post<void>(`/api/projects/${projectId}/issues`, data);
};

export const patchUpdateIssue = async ({
  projectId,
  issueId,
  ...data
}: { projectId: string; issueId: string } & UpdateIssueRequest) => {
  return await httpClient.patch<void>(
    `/api/projects/${projectId}/issues/${issueId}`,
    data,
  );
};

export const deleteIssue = async ({
  projectId,
  issueId,
}: {
  projectId: string;
  issueId: string;
}) => {
  return await httpClient.delete(
    `/api/projects/${projectId}/issues/${issueId}`,
  );
};

export const postTransitionIssue = async ({
  projectId,
  issueId,
  ...data
}: { projectId: string; issueId: string } & TransitionIssueRequest) => {
  return await httpClient.post<void>(
    `/api/projects/${projectId}/issues/${issueId}/transition`,
    data,
  );
};

export const patchAssignIssue = async ({
  projectId,
  issueId,
  ...data
}: { projectId: string; issueId: string } & AssignIssueRequest) => {
  return await httpClient.patch<void>(
    `/api/projects/${projectId}/issues/${issueId}/assignee`,
    data,
  );
};
