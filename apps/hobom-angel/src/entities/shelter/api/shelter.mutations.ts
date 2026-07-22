import { mutationOptions } from "hobom-data";
import {
  deleteAnnouncement,
  deleteFaq,
  editAnnouncement,
  editFaq,
  decideApproval,
  postAnnouncement,
  postFaq,
  requestStaffPromotion,
} from "./shelter.api";
import type { AnnouncementInput, ApprovalDecisionInput, FaqInput } from "./shelter.type";

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

  createFaq: (shelterId: string) =>
    mutationOptions({
      mutationFn: (input: FaqInput) => postFaq(shelterId, input),
    }),

  updateFaq: () =>
    mutationOptions({
      mutationFn: (vars: { id: string; input: FaqInput }) => editFaq(vars.id, vars.input),
    }),

  removeFaq: () =>
    mutationOptions({
      mutationFn: (id: string) => deleteFaq(id),
    }),

  promoteStaff: (shelterId: string) =>
    mutationOptions({
      mutationFn: (candidateUserId: string) => requestStaffPromotion(shelterId, candidateUserId),
    }),

  decidePromotion: () =>
    mutationOptions({
      mutationFn: (vars: { approvalId: string; input: ApprovalDecisionInput }) =>
        decideApproval(vars.approvalId, vars.input),
    }),
} as const;
