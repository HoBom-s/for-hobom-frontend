import type { RawVolunteerEvent } from "../api/volunteer-event.type";
import type { VolunteerEvent } from "../model/volunteer-event.model";

/** Anti-corruption: map the API event to the UI model (straight field copy;
 *  kept for consistency with the entity's other boundaries). */
export const toVolunteerEvent = (raw: RawVolunteerEvent): VolunteerEvent => ({
  id: raw.id,
  title: raw.title,
  description: raw.description,
  startAt: raw.startAt,
  endAt: raw.endAt,
  capacity: raw.capacity,
  signedUpCount: raw.signedUpCount,
  status: raw.status,
});
