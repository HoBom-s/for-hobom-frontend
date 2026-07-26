import { useSuspenseQuery } from "hobom-data";
import { shelterQueries } from "@/entities/shelter";
import { locatableMarkers } from "../lib/locatable-markers.lib";

/** Located shelter markers for the map view, narrowed to the active region.
 *  Markers without coordinates (address kept private) are dropped, since they
 *  can't be placed on the map. */
export const useShelterMarkers = (region?: string) => {
  const { data } = useSuspenseQuery(shelterQueries.markers(region));

  return { markers: locatableMarkers(data) };
};
