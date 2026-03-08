import { mutationOptions } from "@tanstack/react-query";
import {
  postCreateNote,
  patchUpdateNote,
  deleteNote,
  patchUpdateNoteStatus,
  patchToggleNotePin,
  patchReorderNote,
  deleteEmptyTrash,
  postAddNoteMember,
  deleteRemoveNoteMember,
} from "../api/note.api";

export const noteMutations = {
  notes: () => ["notes"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "create"] as const,
      mutationFn: postCreateNote,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "update"] as const,
      mutationFn: patchUpdateNote,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "delete"] as const,
      mutationFn: deleteNote,
    }),
  updateStatus: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "updateStatus"] as const,
      mutationFn: patchUpdateNoteStatus,
    }),
  togglePin: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "togglePin"] as const,
      mutationFn: patchToggleNotePin,
    }),
  reorder: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "reorder"] as const,
      mutationFn: patchReorderNote,
    }),
  emptyTrash: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "emptyTrash"] as const,
      mutationFn: deleteEmptyTrash,
    }),
  addMember: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "addMember"] as const,
      mutationFn: postAddNoteMember,
    }),
  removeMember: () =>
    mutationOptions({
      mutationKey: [...noteMutations.notes(), "removeMember"] as const,
      mutationFn: deleteRemoveNoteMember,
    }),
} as const;
