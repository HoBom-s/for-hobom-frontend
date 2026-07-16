import type { ShelterMarker } from "@/entities/shelter";
import type { VolunteerEvent } from "@/entities/volunteer-event";

/** A volunteer event joined with its shelter's public summary (via
 *  `GET /shelters/map`), since the event itself carries only `shelterId`. */
export interface EnrichedVolunteerEvent extends VolunteerEvent {
  shelter: { name: string; region: string; slug: string } | null;
}

/** Join events with shelter markers by shelterId, so cards can show the shelter
 *  name/region and link to its microsite. */
export const enrichEvents = (
  events: VolunteerEvent[],
  markers: ShelterMarker[],
): EnrichedVolunteerEvent[] => {
  const byId = new Map(markers.map((marker) => [marker.id, marker]));

  return events.map((event) => {
    const marker = byId.get(event.shelterId);

    return {
      ...event,
      shelter: marker ? { name: marker.name, region: marker.region, slug: marker.slug } : null,
    };
  });
};
