import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  RawNoteItemType,
  NoteItemType,
  CreateNoteRequest,
  UpdateNoteRequest,
  UpdateNoteStatusRequest,
  ReorderNoteRequest,
} from "./note.type";
import type { NoteStatus } from "../model/note.model";

const normalizeNote = (raw: RawNoteItemType): NoteItemType => ({
  ...raw,
  id: raw.id.value,
  owner: raw.owner.value,
  color: raw.color.value,
  labels: raw.labels.map((l) => l.value),
  members: raw.members.map((m) => m.value),
});

export const fetchNotes = async (status?: NoteStatus) => {
  const query = status ? `?status=${status}` : "";
  const res = await httpClient.get<HttpResponseType<RawNoteItemType[]>>(
    `/notes${query}`,
  );
  return { ...res, items: res.items.map(normalizeNote) };
};

export const fetchNoteById = async ({ id }: { id: string }) => {
  const res = await httpClient.get<HttpResponseType<RawNoteItemType>>(
    `/notes/${id}`,
  );
  return { ...res, items: normalizeNote(res.items) };
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

export const postAddNoteMember = async ({
  noteId,
  userId,
}: {
  noteId: string;
  userId: string;
}) => {
  return await httpClient.post(`/notes/${noteId}/members`, { userId });
};

export const deleteRemoveNoteMember = async ({
  noteId,
  userId,
}: {
  noteId: string;
  userId: string;
}) => {
  return await httpClient.delete(`/notes/${noteId}/members/${userId}`);
};
