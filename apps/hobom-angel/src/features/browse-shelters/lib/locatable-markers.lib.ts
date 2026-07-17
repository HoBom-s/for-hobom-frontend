import type { ShelterMarker } from "@/entities/shelter";

/** A marker known to have coordinates, so it can be placed on the map. */
export type LocatedMarker = ShelterMarker & { lat: number; lng: number };

/** Keep only markers with coordinates — a shelter that keeps its address private
 *  has none and can't be plotted. */
export const locatableMarkers = (markers: ShelterMarker[]): LocatedMarker[] =>
  markers.filter((marker): marker is LocatedMarker => marker.lat !== null && marker.lng !== null);
