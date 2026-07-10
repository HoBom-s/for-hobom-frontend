import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { issueCommentsSchema } from "./issue-comment.schema";
import type {
  IssueCommentType,
  CreateIssueCommentRequest,
  UpdateIssueCommentRequest,
} from "./issue-comment.type";

export const fetchIssueComments = async (
  {
    projectId,
    issueId,
  }: {
    projectId: string;
    issueId: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<IssueCommentType[]>>(
    `/projects/${projectId}/issues/${issueId}/comments`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(
      issueCommentsSchema,
      "GET /projects/:projectId/issues/:issueId/comments",
    )(res.items),
  };
};

export const postCreateIssueComment = async ({
  projectId,
  issueId,
  ...data
}: { projectId: string; issueId: string } & CreateIssueCommentRequest) => {
  return await httpClient.post<void>(`/projects/${projectId}/issues/${issueId}/comments`, data);
};

export const patchUpdateIssueComment = async ({
  projectId,
  issueId,
  commentId,
  ...data
}: {
  projectId: string;
  issueId: string;
  commentId: string;
} & UpdateIssueCommentRequest) => {
  return await httpClient.patch<void>(
    `/projects/${projectId}/issues/${issueId}/comments/${commentId}`,
    data,
  );
};

export const deleteIssueComment = async ({
  projectId,
  issueId,
  commentId,
}: {
  projectId: string;
  issueId: string;
  commentId: string;
}) => {
  return await httpClient.delete<void>(
    `/projects/${projectId}/issues/${issueId}/comments/${commentId}`,
  );
};
