import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type { LabelItemType, CreateLabelRequest, UpdateLabelRequest } from "./label.type";

export const fetchLabels = async (signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<LabelItemType[]>>("/labels", { signal });
};

export const fetchLabelById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<LabelItemType>>(`/labels/${id}`, { signal });
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
