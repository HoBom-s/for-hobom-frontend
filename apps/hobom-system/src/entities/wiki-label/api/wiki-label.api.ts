import { spaceHttpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  LabelType,
  LabelPageType,
  CreateLabelRequest,
  UpdateLabelRequest,
  AddPageLabelRequest,
} from "./wiki-label.type";

// ── Space Labels ──

export const fetchLabels = async ({ spaceKey }: { spaceKey: string }) => {
  return await spaceHttpClient.get<HttpResponseType<LabelType[]>>(
    `/api/v1/spaces/${spaceKey}/labels`,
  );
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

export const fetchPagesByLabel = async ({
  spaceKey,
  labelId,
}: {
  spaceKey: string;
  labelId: string;
}) => {
  return await spaceHttpClient.get<HttpResponseType<LabelPageType[]>>(
    `/api/v1/spaces/${spaceKey}/labels/${labelId}/pages`,
  );
};
