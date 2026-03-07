import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  BoardDto,
  CreateBoardRequest,
  UpdateBoardRequest,
} from "./board.type";

export const fetchBoardsByProject = async ({
  projectId,
}: {
  projectId: string;
}) => {
  return await httpClient.get<HttpResponseType<BoardDto[]>>(
    `/projects/${projectId}/boards`,
  );
};

export const fetchBoardById = async ({
  projectId,
  boardId,
}: {
  projectId: string;
  boardId: string;
}) => {
  return await httpClient.get<HttpResponseType<BoardDto>>(
    `/projects/${projectId}/boards/${boardId}`,
  );
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
  return await httpClient.patch<void>(
    `/projects/${projectId}/boards/${boardId}`,
    data,
  );
};

export const deleteBoard = async ({
  projectId,
  boardId,
}: {
  projectId: string;
  boardId: string;
}) => {
  return await httpClient.delete<void>(
    `/projects/${projectId}/boards/${boardId}`,
  );
};
