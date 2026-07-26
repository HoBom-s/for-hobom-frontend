import type { ShelterMarker } from "@/entities/shelter";
import type { KoreaMarker } from "@/shared/ui";

/** Count animals per shelter and join with shelter coordinates: one badged map
 *  marker per located shelter that has matching animals. The marker id is the
 *  shelter slug, so selecting it routes straight to the microsite. */
export const aggregateAnimalMarkers = (
  animals: { shelterId: string }[],
  shelters: ShelterMarker[],
): KoreaMarker[] => {
  const counts = new Map<string, number>();

  animals.forEach((animal) => {
    counts.set(animal.shelterId, (counts.get(animal.shelterId) ?? 0) + 1);
  });

  return shelters.flatMap((shelter) => {
    const count = counts.get(shelter.id);

    if (!count || shelter.lat === null || shelter.lng === null) return [];

    return [
      {
        id: shelter.slug,
        lng: shelter.lng,
        lat: shelter.lat,
        label: shelter.name,
        badge: String(count),
      },
    ];
  });
};
