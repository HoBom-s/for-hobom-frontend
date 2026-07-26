import { useSuspenseQuery } from "hobom-data";
import { animalQueries } from "@/entities/animal";
import type { AnimalDetail } from "@/entities/animal";

/** Suspense-backed single animal profile (§02). Loading suspends to the
 *  gallery skeleton; a missing/failed fetch bubbles to the route boundary. */
export const useAnimalDetail = (id: string): AnimalDetail => {
  const { data } = useSuspenseQuery(animalQueries.detail(id));

  return data;
};
