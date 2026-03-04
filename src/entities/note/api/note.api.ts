import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  NoteItemType,
  CreateNoteRequest,
  UpdateNoteRequest,
  UpdateNoteStatusRequest,
  ReorderNoteRequest,
} from "./note.type";
import type { NoteStatus } from "../model/note.model";

export const fetchNotes = async (status?: NoteStatus) => {
  const query = status ? `?status=${status}` : "";
  return await httpClient.get<HttpResponseType<NoteItemType[]>>(
    `/api/notes${query}`,
  );
};

export const fetchNoteById = async ({ id }: { id: string }) => {
  return await httpClient.get<HttpResponseType<NoteItemType>>(
    `/api/notes/${id}`,
  );
};

export const postCreateNote = async (data: CreateNoteRequest) => {
  return await httpClient.post<void>(`/api/notes`, data);
};

export const patchUpdateNote = async ({
  id,
  ...data
}: { id: string } & UpdateNoteRequest) => {
  return await httpClient.patch<void>(`/api/notes/${id}`, data);
};

export const deleteNote = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/api/notes/${id}`);
};

export const patchUpdateNoteStatus = async ({
  id,
  status,
}: { id: string } & UpdateNoteStatusRequest) => {
  return await httpClient.patch(`/api/notes/${id}/status`, { status });
};

export const patchToggleNotePin = async ({ id }: { id: string }) => {
  return await httpClient.patch(`/api/notes/${id}/pin`, {});
};

export const patchReorderNote = async ({
  id,
  order,
}: { id: string } & ReorderNoteRequest) => {
  return await httpClient.patch(`/api/notes/${id}/order`, { order });
};

export const deleteEmptyTrash = async () => {
  return await httpClient.delete(`/api/notes/trash`);
};
