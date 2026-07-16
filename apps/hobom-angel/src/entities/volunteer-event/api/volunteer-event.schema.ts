import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawVolunteerEvent, RawVolunteerSignup } from "./volunteer-event.type";

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

/** `POST /volunteer-events/:eventId/signups` — the created signup's id. */
export const volunteerSignupSchema: Schema<RawVolunteerSignup> = HoBomSchema.object({
  signupId: HoBomSchema.string(),
});
