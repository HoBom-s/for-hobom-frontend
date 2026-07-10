import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { labelItemSchema, labelItemsSchema } from "./label.schema";
import type { LabelItemType, CreateLabelRequest, UpdateLabelRequest } from "./label.type";

export const fetchLabels = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<LabelItemType[]>>("/labels", { signal });

  return { ...res, items: parseResponse(labelItemsSchema, "GET /labels")(res.items) };
};

export const fetchLabelById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<LabelItemType>>(`/labels/${id}`, { signal });

  return { ...res, items: parseResponse(labelItemSchema, "GET /labels/:id")(res.items) };
};

export const postCreateLabel = async (data: CreateLabelRequest) => {
  return await httpClient.post<void>("/labels", data);
};

export const patchUpdateLabel = async ({ id, ...data }: { id: string } & UpdateLabelRequest) => {
  return await httpClient.patch<void>(`/labels/${id}`, data);
};

export const deleteLabel = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/labels/${id}`);
};
