import type {
  VolunteerEventStatus,
  VolunteerSignupStatus,
  VolunteerType,
} from "../model/volunteer-event.model";

/** Flight/transport payload for OVERSEAS events, straight off the wire. */
export interface RawVolunteerTransport {
  departure: string;
  arrival: string;
  flightAt: string;
  animalIds: string[];
  animalCount: number;
  qualification: string | null;
}

/** A volunteer event off the wire — shared by the shelter list, global list, and
 *  single-event reads. All reads are viewer-aware, carrying the caller's own
 *  live signup (`mySignupId`/`mySignupStatus`, null when not signed up). */
export interface RawVolunteerEvent {
  id: string;
  shelterId: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  capacity: number;
  signedUpCount: number;
  status: VolunteerEventStatus;
  type: VolunteerType;
  transport: RawVolunteerTransport | null;
  mySignupId: string | null;
  mySignupStatus: VolunteerSignupStatus | null;
}

/** `POST /volunteer-events/:eventId/signups` response. */
export interface RawVolunteerSignup {
  signupId: string;
}
