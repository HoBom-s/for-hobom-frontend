import { useSuspenseQueries } from "hobom-data";
import { animalQueries } from "@/entities/animal";
import { shelterQueries } from "@/entities/shelter";
import type { AnimalFilters } from "@/entities/animal";
import { aggregateAnimalMarkers } from "../lib/aggregate-animal-markers.lib";

/** Map markers for the current animal filters: a sample of matching animals is
 *  aggregated by shelter and joined with shelter coordinates. Both fetches run
 *  in parallel to avoid a waterfall. */
export const useAnimalMapMarkers = (filters: AnimalFilters) => {
  const [animals, shelters] = useSuspenseQueries({
    queries: [animalQueries.mapSample(filters), shelterQueries.markers()],
  });

  return { markers: aggregateAnimalMarkers(animals.data.animals, shelters.data) };
};
