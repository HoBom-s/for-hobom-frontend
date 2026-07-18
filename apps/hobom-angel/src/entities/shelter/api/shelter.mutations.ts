import { mutationOptions } from "hobom-data";
import { deleteAnnouncement, editAnnouncement, postAnnouncement } from "./shelter.api";
import type { AnnouncementInput } from "./shelter.type";

export const shelterMutations = {
  createAnnouncement: (shelterId: string) =>
    mutationOptions({
      mutationFn: (input: AnnouncementInput) => postAnnouncement(shelterId, input),
    }),

  updateAnnouncement: () =>
    mutationOptions({
      mutationFn: (vars: { id: string; input: AnnouncementInput }) =>
        editAnnouncement(vars.id, vars.input),
    }),

  removeAnnouncement: () =>
    mutationOptions({
      mutationFn: (id: string) => deleteAnnouncement(id),
    }),
} as const;
