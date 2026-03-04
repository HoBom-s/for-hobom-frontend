import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  LabelItemType,
  CreateLabelRequest,
  UpdateLabelRequest,
} from "./label.type";

export const fetchLabels = async () => {
  return await httpClient.get<HttpResponseType<LabelItemType[]>>("/api/labels");
};

export const fetchLabelById = async ({ id }: { id: string }) => {
  return await httpClient.get<HttpResponseType<LabelItemType>>(
    `/api/labels/${id}`,
  );
};

export const postCreateLabel = async (data: CreateLabelRequest) => {
  return await httpClient.post<void>("/api/labels", data);
};

export const patchUpdateLabel = async ({
  id,
  ...data
}: { id: string } & UpdateLabelRequest) => {
  return await httpClient.patch<void>(`/api/labels/${id}`, data);
};

export const deleteLabel = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/api/labels/${id}`);
};
