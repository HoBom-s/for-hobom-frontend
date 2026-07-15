import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawVolunteerEvent } from "./volunteer-event.type";

/** `GET /shelters/:shelterId/volunteer-events` — validates the wire contract at
 *  the boundary. shelterId is omitted; object() strips unknown keys. */
export const volunteerEventsSchema: Schema<RawVolunteerEvent[]> = HoBomSchema.array(
  HoBomSchema.object({
    id: HoBomSchema.string(),
    title: HoBomSchema.string(),
    description: HoBomSchema.string(),
    startAt: HoBomSchema.string(),
    endAt: HoBomSchema.string(),
    capacity: HoBomSchema.number(),
    signedUpCount: HoBomSchema.number(),
    status: HoBomSchema.enum(["OPEN", "CLOSED", "CANCELLED"]),
  }),
);
