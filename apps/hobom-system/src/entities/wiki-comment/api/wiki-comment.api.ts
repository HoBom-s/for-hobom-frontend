import { spaceHttpClient } from "@/shared/api";
import type { HttpResponseType, PaginatedItems } from "@/shared/api";
import type { CommentType, CreateCommentRequest, UpdateCommentRequest } from "./wiki-comment.type";

export const fetchComments = async (
  {
    spaceKey,
    pageId,
    offset = 0,
    limit = 50,
  }: {
    spaceKey: string;
    pageId: string;
    offset?: number;
    limit?: number;
  },
  signal?: AbortSignal,
) => {
  return await spaceHttpClient.get<HttpResponseType<PaginatedItems<CommentType>>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/comments?offset=${offset}&limit=${limit}`,
    { signal },
  );
};

export const postCreateComment = async ({
  spaceKey,
  pageId,
  ...data
}: { spaceKey: string; pageId: string } & CreateCommentRequest) => {
  return await spaceHttpClient.post<HttpResponseType<CommentType>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/comments`,
    data,
  );
};

export const putUpdateComment = async ({
  spaceKey,
  pageId,
  commentId,
  ...data
}: {
  spaceKey: string;
  pageId: string;
  commentId: string;
} & UpdateCommentRequest) => {
  return await spaceHttpClient.put<HttpResponseType<CommentType>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/comments/${commentId}`,
    data,
  );
};

export const deleteComment = async ({
  spaceKey,
  pageId,
  commentId,
}: {
  spaceKey: string;
  pageId: string;
  commentId: string;
}) => {
  return await spaceHttpClient.delete<HttpResponseType<unknown>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/comments/${commentId}`,
  );
};
