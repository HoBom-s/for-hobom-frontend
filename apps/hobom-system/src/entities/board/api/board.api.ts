import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { boardSchema, boardsSchema } from "./board.schema";
import type { BoardDto, CreateBoardRequest, UpdateBoardRequest } from "./board.type";

export const fetchBoardsByProject = async (
  { projectId }: { projectId: string },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<BoardDto[]>>(
    `/projects/${projectId}/boards`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(boardsSchema, "GET /projects/:projectId/boards")(res.items),
  };
};

export const fetchBoardById = async (
  {
    projectId,
    boardId,
  }: {
    projectId: string;
    boardId: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<BoardDto>>(
    `/projects/${projectId}/boards/${boardId}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(boardSchema, "GET /projects/:projectId/boards/:boardId")(res.items),
  };
};

export const postCreateBoard = async ({
  projectId,
  ...data
}: { projectId: string } & CreateBoardRequest) => {
  return await httpClient.post<void>(`/projects/${projectId}/boards`, data);
};

export const patchUpdateBoard = async ({
  projectId,
  boardId,
  ...data
}: { projectId: string; boardId: string } & UpdateBoardRequest) => {
  return await httpClient.patch<void>(`/projects/${projectId}/boards/${boardId}`, data);
};

export const deleteBoard = async ({
  projectId,
  boardId,
}: {
  projectId: string;
  boardId: string;
}) => {
  return await httpClient.delete<void>(`/projects/${projectId}/boards/${boardId}`);
};
