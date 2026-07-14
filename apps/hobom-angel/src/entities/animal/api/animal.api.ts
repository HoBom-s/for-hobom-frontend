import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { toAnimal } from "../lib/to-animal.lib";
import { toAnimalDetail } from "../lib/to-animal-detail.lib";
import { animalDetailSchema, animalPageSchema } from "./animal.schema";
import type { Animal, AnimalDetail } from "../model/animal.model";
import type { AnimalSearchParams } from "./animal.type";

/** A converted page of animals plus the cursor to the next one. */
export interface AnimalPageResult {
  animals: Animal[];
  nextCursor: string | null;
  hasNext: boolean;
}

const parsePage = parseResponse(animalPageSchema, "GET /animals");
const parseDetail = parseResponse(animalDetailSchema, "GET /animals/:id");

/** Search/browse animals (filters + cursor pagination). */
export const searchAnimals = (
  params: AnimalSearchParams,
  signal?: AbortSignal,
): Promise<AnimalPageResult> =>
  httpClient
    .get(`/animals${toQueryString(params)}`, { signal })
    .then(parsePage)
    .then((page) => ({
      animals: page.items.map(toAnimal),
      nextCursor: page.nextCursor,
      hasNext: page.hasNext,
    }));

/** Fetch a single animal's full profile (§02). */
export const getAnimal = (id: string, signal?: AbortSignal): Promise<AnimalDetail> =>
  httpClient.get(`/animals/${id}`, { signal }).then(parseDetail).then(toAnimalDetail);
