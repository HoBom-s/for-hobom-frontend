import { httpClient } from "@/shared/api";
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
  return await httpClient.get<HttpResponseType<PaginatedItems<SpaceType>>>(
    `/space-api/api/v1/spaces?offset=${offset}&limit=${limit}`,
  );
};

export const fetchSpaceByKey = async ({ key }: { key: string }) => {
  return await httpClient.get<HttpResponseType<SpaceType>>(
    `/space-api/api/v1/spaces/${key}`,
  );
};

export const postCreateSpace = async (data: CreateSpaceRequest) => {
  return await httpClient.post<HttpResponseType<SpaceType>>(
    "/space-api/api/v1/spaces",
    data,
  );
};

export const putUpdateSpace = async ({
  key,
  ...data
}: { key: string } & UpdateSpaceRequest) => {
  return await httpClient.put<HttpResponseType<SpaceType>>(
    `/space-api/api/v1/spaces/${key}`,
    data,
  );
};

export const deleteSpace = async ({ key }: { key: string }) => {
  return await httpClient.delete<HttpResponseType<unknown>>(
    `/space-api/api/v1/spaces/${key}`,
  );
};
