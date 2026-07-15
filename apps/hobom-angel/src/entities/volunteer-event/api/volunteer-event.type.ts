import type { VolunteerEventStatus } from "../model/volunteer-event.model";

/** `GET /shelters/:shelterId/volunteer-events` item. The wire sends `shelterId`,
 *  but the schema strips it (redundant — the caller already holds it), so it is
 *  absent from the parsed shape. */
export interface RawVolunteerEvent {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  capacity: number;
  signedUpCount: number;
  status: VolunteerEventStatus;
}

/** `POST /volunteer-events/:eventId/signups` response. */
export interface RawVolunteerSignup {
  signupId: string;
}
