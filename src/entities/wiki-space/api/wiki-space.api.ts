import { spaceHttpClient } from "@/shared/api";
import type { HttpResponseType, PaginatedItems } from "@/shared/api";
import type {
  SpaceType,
  CreateSpaceRequest,
  UpdateSpaceRequest,
} from "./wiki-space.type";

export const fetchSpaces = async (params?: {
  offset?: number;
  limit?: number;
}) => {
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 20;
  return await spaceHttpClient.get<HttpResponseType<PaginatedItems<SpaceType>>>(
    `/api/v1/spaces?offset=${offset}&limit=${limit}`,
  );
};

export const fetchSpaceByKey = async ({ key }: { key: string }) => {
  return await spaceHttpClient.get<HttpResponseType<SpaceType>>(
    `/api/v1/spaces/${key}`,
  );
};

export const postCreateSpace = async (data: CreateSpaceRequest) => {
  return await spaceHttpClient.post<HttpResponseType<SpaceType>>(
    "/api/v1/spaces",
    data,
  );
};

export const putUpdateSpace = async ({
  key,
  ...data
}: { key: string } & UpdateSpaceRequest) => {
  return await spaceHttpClient.put<HttpResponseType<SpaceType>>(
    `/api/v1/spaces/${key}`,
    data,
  );
};

export const deleteSpace = async ({ key }: { key: string }) => {
  return await spaceHttpClient.delete<HttpResponseType<unknown>>(
    `/api/v1/spaces/${key}`,
  );
};
