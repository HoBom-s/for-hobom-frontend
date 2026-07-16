import { mutationOptions } from "hobom-data";
import { signUpForVolunteerEvent } from "./volunteer-event.api";

export const volunteerEventMutations = {
  signup: (eventId: string) =>
    mutationOptions({
      mutationFn: () => signUpForVolunteerEvent(eventId),
    }),
} as const;
