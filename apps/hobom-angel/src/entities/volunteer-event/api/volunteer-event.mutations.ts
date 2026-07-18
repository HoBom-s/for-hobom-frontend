import { mutationOptions } from "hobom-data";
import {
  cancelVolunteerEvent,
  createVolunteerEvent,
  decideVolunteerSignup,
  signUpForVolunteerEvent,
} from "./volunteer-event.api";
import type { CreateVolunteerEventInput } from "./volunteer-event.type";

export const volunteerEventMutations = {
  signup: (eventId: string) =>
    mutationOptions({
      mutationFn: () => signUpForVolunteerEvent(eventId),
    }),

  create: (shelterId: string) =>
    mutationOptions({
      mutationFn: (input: CreateVolunteerEventInput) => createVolunteerEvent(shelterId, input),
    }),

  cancel: () =>
    mutationOptions({
      mutationFn: (eventId: string) => cancelVolunteerEvent(eventId),
    }),

  decideSignup: () =>
    mutationOptions({
      mutationFn: (vars: { signupId: string; decision: "APPROVE" | "REJECT" }) =>
        decideVolunteerSignup(vars.signupId, vars.decision),
    }),
} as const;
