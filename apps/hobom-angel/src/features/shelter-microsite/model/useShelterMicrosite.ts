import { useSuspenseQuery } from "hobom-data";
import { shelterQueries } from "@/entities/shelter";
import type { Shelter } from "@/entities/shelter";

/** Suspense-backed shelter profile by slug (§04). A missing/failed fetch bubbles
 *  to the route boundary. */
export const useShelterMicrosite = (slug: string): Shelter => {
  const { data } = useSuspenseQuery(shelterQueries.detail(slug));

  return data;
};
