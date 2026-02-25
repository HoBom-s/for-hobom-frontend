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
    `/notes${query}`,
  );
};

export const fetchNoteById = async ({ id }: { id: string }) => {
  return await httpClient.get<HttpResponseType<NoteItemType>>(`/notes/${id}`);
};

export const postCreateNote = async (data: CreateNoteRequest) => {
  return await httpClient.post<void>(`/notes`, data);
};

export const patchUpdateNote = async ({
  id,
  ...data
}: { id: string } & UpdateNoteRequest) => {
  return await httpClient.patch<void>(`/notes/${id}`, data);
};

export const deleteNote = async ({ id }: { id: string }) => {
  return await httpClient.delete(`/notes/${id}`);
};

export const patchUpdateNoteStatus = async ({
  id,
  status,
}: { id: string } & UpdateNoteStatusRequest) => {
  return await httpClient.patch(`/notes/${id}/status`, { status });
};

export const patchToggleNotePin = async ({ id }: { id: string }) => {
  return await httpClient.patch(`/notes/${id}/pin`, {});
};

export const patchReorderNote = async ({
  id,
  order,
}: { id: string } & ReorderNoteRequest) => {
  return await httpClient.patch(`/notes/${id}/order`, { order });
};

export const deleteEmptyTrash = async () => {
  return await httpClient.delete(`/notes/trash`);
};
