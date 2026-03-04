import { httpClient } from "@/shared/api";
import type { HttpResponseType, PaginatedItems } from "@/shared/api";
import type {
  PageType,
  PageTreeNode,
  PageVersionType,
  CreatePageRequest,
  UpdatePageRequest,
  SearchResultType,
} from "./wiki-page.type";

// ── Pages ──

export const fetchPageTree = async ({ spaceKey }: { spaceKey: string }) => {
  return await httpClient.get<HttpResponseType<PageTreeNode[]>>(
    `/space-api/api/v1/spaces/${spaceKey}/pages`,
  );
};

export const fetchPageById = async ({
  spaceKey,
  pageId,
}: {
  spaceKey: string;
  pageId: string;
}) => {
  return await httpClient.get<HttpResponseType<PageType>>(
    `/space-api/api/v1/spaces/${spaceKey}/pages/${pageId}`,
  );
};

export const postCreatePage = async ({
  spaceKey,
  ...data
}: { spaceKey: string } & CreatePageRequest) => {
  return await httpClient.post<HttpResponseType<PageType>>(
    `/space-api/api/v1/spaces/${spaceKey}/pages`,
    data,
  );
};

export const putUpdatePage = async ({
  spaceKey,
  pageId,
  ...data
}: { spaceKey: string; pageId: string } & UpdatePageRequest) => {
  return await httpClient.put<HttpResponseType<PageType>>(
    `/space-api/api/v1/spaces/${spaceKey}/pages/${pageId}`,
    data,
  );
};

export const deletePage = async ({
  spaceKey,
  pageId,
}: {
  spaceKey: string;
  pageId: string;
}) => {
  return await httpClient.delete<HttpResponseType<unknown>>(
    `/space-api/api/v1/spaces/${spaceKey}/pages/${pageId}`,
  );
};

// ── Versions ──

export const fetchPageVersions = async ({
  spaceKey,
  pageId,
  offset = 0,
  limit = 20,
}: {
  spaceKey: string;
  pageId: string;
  offset?: number;
  limit?: number;
}) => {
  return await httpClient.get<
    HttpResponseType<PaginatedItems<PageVersionType>>
  >(
    `/space-api/api/v1/spaces/${spaceKey}/pages/${pageId}/versions?offset=${offset}&limit=${limit}`,
  );
};

export const fetchPageVersion = async ({
  spaceKey,
  pageId,
  version,
}: {
  spaceKey: string;
  pageId: string;
  version: number;
}) => {
  return await httpClient.get<HttpResponseType<PageVersionType>>(
    `/space-api/api/v1/spaces/${spaceKey}/pages/${pageId}/versions/${version}`,
  );
};

export const postRestorePageVersion = async ({
  spaceKey,
  pageId,
  version,
}: {
  spaceKey: string;
  pageId: string;
  version: number;
}) => {
  return await httpClient.post<HttpResponseType<PageType>>(
    `/space-api/api/v1/spaces/${spaceKey}/pages/${pageId}/versions/${version}/restore`,
    {},
  );
};

// ── Search ──

export const searchPages = async ({
  q,
  spaceKey,
  offset = 0,
  limit = 20,
}: {
  q: string;
  spaceKey?: string;
  offset?: number;
  limit?: number;
}) => {
  const base = spaceKey
    ? `/space-api/api/v1/search/spaces/${spaceKey}`
    : "/space-api/api/v1/search";
  return await httpClient.get<
    HttpResponseType<PaginatedItems<SearchResultType>>
  >(`${base}?q=${encodeURIComponent(q)}&offset=${offset}&limit=${limit}`);
};
