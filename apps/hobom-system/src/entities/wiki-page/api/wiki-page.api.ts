import { spaceHttpClient } from "@/shared/api";
import type { HttpResponseType, PaginatedItems } from "@/shared/api";
import type {
  PageType,
  PageTreeNode,
  PageVersionType,
  CreatePageRequest,
  UpdatePageRequest,
  SearchResultType,
  MovePageRequest,
  CopyPageRequest,
  DiffEntryType,
  TrashPageType,
} from "./wiki-page.type";

// ── Pages ──

export const fetchPageTree = async ({ spaceKey }: { spaceKey: string }, signal?: AbortSignal) => {
  return await spaceHttpClient.get<HttpResponseType<PageTreeNode[]>>(
    `/api/v1/spaces/${spaceKey}/pages`,
    { signal },
  );
};

export const fetchPageById = async (
  { spaceKey, pageId }: { spaceKey: string; pageId: string },
  signal?: AbortSignal,
) => {
  return await spaceHttpClient.get<HttpResponseType<PageType>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}`,
    { signal },
  );
};

export const postCreatePage = async ({
  spaceKey,
  ...data
}: { spaceKey: string } & CreatePageRequest) => {
  return await spaceHttpClient.post<HttpResponseType<PageType>>(
    `/api/v1/spaces/${spaceKey}/pages`,
    data,
  );
};

export const putUpdatePage = async ({
  spaceKey,
  pageId,
  ...data
}: { spaceKey: string; pageId: string } & UpdatePageRequest) => {
  return await spaceHttpClient.put<HttpResponseType<PageType>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}`,
    data,
  );
};

export const deletePage = async ({ spaceKey, pageId }: { spaceKey: string; pageId: string }) => {
  return await spaceHttpClient.delete<HttpResponseType<unknown>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}`,
  );
};

// ── Versions ──

export const fetchPageVersions = async (
  {
    spaceKey,
    pageId,
    offset = 0,
    limit = 20,
  }: {
    spaceKey: string;
    pageId: string;
    offset?: number;
    limit?: number;
  },
  signal?: AbortSignal,
) => {
  return await spaceHttpClient.get<HttpResponseType<PaginatedItems<PageVersionType>>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/versions?offset=${offset}&limit=${limit}`,
    { signal },
  );
};

export const fetchPageVersion = async (
  {
    spaceKey,
    pageId,
    version,
  }: {
    spaceKey: string;
    pageId: string;
    version: number;
  },
  signal?: AbortSignal,
) => {
  return await spaceHttpClient.get<HttpResponseType<PageVersionType>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/versions/${version}`,
    { signal },
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
  return await spaceHttpClient.post<HttpResponseType<PageType>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/versions/${version}/restore`,
    {},
  );
};

// ── Move / Copy ──

export const patchMovePage = async ({
  spaceKey,
  pageId,
  ...data
}: { spaceKey: string; pageId: string } & MovePageRequest) => {
  return await spaceHttpClient.patch<HttpResponseType<PageType>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/move`,
    data,
  );
};

export const postCopyPage = async ({
  spaceKey,
  pageId,
  ...data
}: { spaceKey: string; pageId: string } & CopyPageRequest) => {
  return await spaceHttpClient.post<HttpResponseType<PageType>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/copy`,
    data,
  );
};

// ── Version Diff ──

export const fetchVersionDiff = async (
  {
    spaceKey,
    pageId,
    fromVersion,
    toVersion,
  }: {
    spaceKey: string;
    pageId: string;
    fromVersion: number;
    toVersion: number;
  },
  signal?: AbortSignal,
) => {
  return await spaceHttpClient.get<HttpResponseType<DiffEntryType[]>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/versions/diff?from=${fromVersion}&to=${toVersion}`,
    { signal },
  );
};

// ── Trash ──

export const fetchTrashPages = async (
  {
    spaceKey,
    offset = 0,
    limit = 20,
  }: {
    spaceKey: string;
    offset?: number;
    limit?: number;
  },
  signal?: AbortSignal,
) => {
  return await spaceHttpClient.get<HttpResponseType<PaginatedItems<TrashPageType>>>(
    `/api/v1/spaces/${spaceKey}/trash?offset=${offset}&limit=${limit}`,
    { signal },
  );
};

export const postRestoreTrashPage = async ({
  spaceKey,
  pageId,
}: {
  spaceKey: string;
  pageId: string;
}) => {
  return await spaceHttpClient.post<HttpResponseType<TrashPageType>>(
    `/api/v1/spaces/${spaceKey}/trash/${pageId}/restore`,
    {},
  );
};

export const deleteTrashPagePermanently = async ({
  spaceKey,
  pageId,
}: {
  spaceKey: string;
  pageId: string;
}) => {
  return await spaceHttpClient.delete<HttpResponseType<unknown>>(
    `/api/v1/spaces/${spaceKey}/trash/${pageId}`,
  );
};

// ── Search ──

export const searchPages = async (
  {
    q,
    spaceKey,
    offset = 0,
    limit = 20,
  }: {
    q: string;
    spaceKey?: string;
    offset?: number;
    limit?: number;
  },
  signal?: AbortSignal,
) => {
  const base = spaceKey ? `/api/v1/search/spaces/${spaceKey}` : "/api/v1/search";

  return await spaceHttpClient.get<HttpResponseType<PaginatedItems<SearchResultType>>>(
    `${base}?q=${encodeURIComponent(q)}&offset=${offset}&limit=${limit}`,
    { signal },
  );
};
