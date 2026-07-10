import { spaceHttpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType, PaginatedItems } from "@/shared/api";
import { spaceSchema, spacesPageSchema } from "./wiki-space.schema";
import type { SpaceType, CreateSpaceRequest, UpdateSpaceRequest } from "./wiki-space.type";

export const fetchSpaces = async (
  params?: { offset?: number; limit?: number },
  signal?: AbortSignal,
) => {
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 20;

  const res = await spaceHttpClient.get<HttpResponseType<PaginatedItems<SpaceType>>>(
    `/api/v1/spaces?offset=${offset}&limit=${limit}`,
    { signal },
  );

  return { ...res, items: parseResponse(spacesPageSchema, "GET /api/v1/spaces")(res.items) };
};

export const fetchSpaceByKey = async ({ key }: { key: string }, signal?: AbortSignal) => {
  const res = await spaceHttpClient.get<HttpResponseType<SpaceType>>(`/api/v1/spaces/${key}`, {
    signal,
  });

  return { ...res, items: parseResponse(spaceSchema, "GET /api/v1/spaces/:key")(res.items) };
};

export const postCreateSpace = async (data: CreateSpaceRequest) => {
  return await spaceHttpClient.post<HttpResponseType<SpaceType>>("/api/v1/spaces", data);
};

export const putUpdateSpace = async ({ key, ...data }: { key: string } & UpdateSpaceRequest) => {
  return await spaceHttpClient.put<HttpResponseType<SpaceType>>(`/api/v1/spaces/${key}`, data);
};

export const deleteSpace = async ({ key }: { key: string }) => {
  return await spaceHttpClient.delete<HttpResponseType<unknown>>(`/api/v1/spaces/${key}`);
};
