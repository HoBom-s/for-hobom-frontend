import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type {
  RawCreateVolunteerEventResult,
  RawVolunteerApplicant,
  RawVolunteerEvent,
  RawVolunteerSignup,
} from "./volunteer-event.type";

/** A single volunteer event on the wire — reused for the shelter list, global
 *  list, and single-event reads (all viewer-aware). */
export const volunteerEventSchema: Schema<RawVolunteerEvent> = HoBomSchema.object({
  id: HoBomSchema.string(),
  shelterId: HoBomSchema.string(),
  title: HoBomSchema.string(),
  description: HoBomSchema.string(),
  startAt: HoBomSchema.string(),
  endAt: HoBomSchema.string(),
  capacity: HoBomSchema.number(),
  signedUpCount: HoBomSchema.number(),
  status: HoBomSchema.enum(["OPEN", "CLOSED", "CANCELLED"]),
  type: HoBomSchema.enum(["GENERAL", "OVERSEAS"]),
  transport: HoBomSchema.object({
    departure: HoBomSchema.string(),
    arrival: HoBomSchema.string(),
    flightAt: HoBomSchema.string(),
    animalIds: HoBomSchema.array(HoBomSchema.string()),
    animalCount: HoBomSchema.number(),
    qualification: HoBomSchema.string().nullable(),
  }).nullable(),
  mySignupId: HoBomSchema.string().nullable(),
  mySignupStatus: HoBomSchema.enum(["PENDING", "APPROVED"]).nullable(),
});

/** `GET /shelters/:shelterId/volunteer-events` and `GET /volunteer-events` — a
 *  plain array of events. */
export const volunteerEventsSchema: Schema<RawVolunteerEvent[]> =
  HoBomSchema.array(volunteerEventSchema);

/** `GET /volunteer-signups` — a cursor page of the viewer's signed-up events. */
export const volunteerEventPageSchema = HoBomSchema.object({
  items: volunteerEventsSchema,
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});

/** `POST /volunteer-events/:eventId/signups` — the created signup's id. */
export const volunteerSignupSchema: Schema<RawVolunteerSignup> = HoBomSchema.object({
  signupId: HoBomSchema.string(),
});

/** `GET /volunteer-events/:eventId/signups` — the event's applicants (staff). */
export const volunteerApplicantsSchema: Schema<RawVolunteerApplicant[]> = HoBomSchema.array(
  HoBomSchema.object({
    signupId: HoBomSchema.string(),
    volunteerId: HoBomSchema.string(),
    status: HoBomSchema.enum(["PENDING", "APPROVED", "REJECTED", "WITHDRAWN"]),
  }),
);

/** `POST /shelters/:shelterId/volunteer-events` — the created event's id. */
export const createVolunteerEventSchema: Schema<RawCreateVolunteerEventResult> = HoBomSchema.object({
  eventId: HoBomSchema.string(),
});
