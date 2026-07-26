import type { RawVolunteerEvent } from "../api/volunteer-event.type";
import type { VolunteerEvent } from "../model/volunteer-event.model";

/** Anti-corruption: map the API event to the UI model (straight field copy;
 *  kept for consistency with the entity's other boundaries). */
export const toVolunteerEvent = (raw: RawVolunteerEvent): VolunteerEvent => ({
  id: raw.id,
  shelterId: raw.shelterId,
  title: raw.title,
  description: raw.description,
  startAt: raw.startAt,
  endAt: raw.endAt,
  capacity: raw.capacity,
  signedUpCount: raw.signedUpCount,
  status: raw.status,
  type: raw.type,
  transport: raw.transport
    ? {
        departure: raw.transport.departure,
        arrival: raw.transport.arrival,
        flightAt: raw.transport.flightAt,
        animalCount: raw.transport.animalCount,
        qualification: raw.transport.qualification,
      }
    : null,
  mySignupId: raw.mySignupId,
  mySignupStatus: raw.mySignupStatus,
});
