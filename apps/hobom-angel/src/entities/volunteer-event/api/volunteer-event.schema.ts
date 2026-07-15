import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawVolunteerEvent, RawVolunteerSignup } from "./volunteer-event.type";

/** A single volunteer event on the wire. shelterId is omitted; object() strips
 *  unknown keys. Reused for both the global list and single-event endpoints. */
export const volunteerEventSchema: Schema<RawVolunteerEvent> = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
  description: HoBomSchema.string(),
  startAt: HoBomSchema.string(),
  endAt: HoBomSchema.string(),
  capacity: HoBomSchema.number(),
  signedUpCount: HoBomSchema.number(),
  status: HoBomSchema.enum(["OPEN", "CLOSED", "CANCELLED"]),
});

/** `GET /shelters/:shelterId/volunteer-events` and `GET /volunteer-events` — a
 *  plain array of events. */
export const volunteerEventsSchema: Schema<RawVolunteerEvent[]> =
  HoBomSchema.array(volunteerEventSchema);

/** `POST /volunteer-events/:eventId/signups` — the created signup's id. */
export const volunteerSignupSchema: Schema<RawVolunteerSignup> = HoBomSchema.object({
  signupId: HoBomSchema.string(),
});
