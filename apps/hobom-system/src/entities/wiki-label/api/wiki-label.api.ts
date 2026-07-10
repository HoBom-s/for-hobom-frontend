import { spaceHttpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { labelsSchema, labelPagesSchema } from "./wiki-label.schema";
import type {
  LabelType,
  LabelPageType,
  CreateLabelRequest,
  UpdateLabelRequest,
  AddPageLabelRequest,
} from "./wiki-label.type";

// ── Space Labels ──

export const fetchLabels = async ({ spaceKey }: { spaceKey: string }, signal?: AbortSignal) => {
  const res = await spaceHttpClient.get<HttpResponseType<LabelType[]>>(
    `/api/v1/spaces/${spaceKey}/labels`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(labelsSchema, "GET /api/v1/spaces/:spaceKey/labels")(res.items),
  };
};

export const postCreateLabel = async ({
  spaceKey,
  ...data
}: { spaceKey: string } & CreateLabelRequest) => {
  return await spaceHttpClient.post<HttpResponseType<LabelType>>(
    `/api/v1/spaces/${spaceKey}/labels`,
    data,
  );
};

export const putUpdateLabel = async ({
  spaceKey,
  labelId,
  ...data
}: { spaceKey: string; labelId: string } & UpdateLabelRequest) => {
  return await spaceHttpClient.put<HttpResponseType<LabelType>>(
    `/api/v1/spaces/${spaceKey}/labels/${labelId}`,
    data,
  );
};

export const deleteLabel = async ({ spaceKey, labelId }: { spaceKey: string; labelId: string }) => {
  return await spaceHttpClient.delete<HttpResponseType<unknown>>(
    `/api/v1/spaces/${spaceKey}/labels/${labelId}`,
  );
};

// ── Page Labels ──

export const postAddPageLabel = async ({
  spaceKey,
  pageId,
  ...data
}: { spaceKey: string; pageId: string } & AddPageLabelRequest) => {
  return await spaceHttpClient.post<HttpResponseType<unknown>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/labels`,
    data,
  );
};

export const deletePageLabel = async ({
  spaceKey,
  pageId,
  labelId,
}: {
  spaceKey: string;
  pageId: string;
  labelId: string;
}) => {
  return await spaceHttpClient.delete<HttpResponseType<unknown>>(
    `/api/v1/spaces/${spaceKey}/pages/${pageId}/labels/${labelId}`,
  );
};

// ── Label Pages ──

export const fetchPagesByLabel = async (
  {
    spaceKey,
    labelId,
  }: {
    spaceKey: string;
    labelId: string;
  },
  signal?: AbortSignal,
) => {
  const res = await spaceHttpClient.get<HttpResponseType<LabelPageType[]>>(
    `/api/v1/spaces/${spaceKey}/labels/${labelId}/pages`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(
      labelPagesSchema,
      "GET /api/v1/spaces/:spaceKey/labels/:labelId/pages",
    )(res.items),
  };
};
