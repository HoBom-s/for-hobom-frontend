import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { toAnimal } from "../lib/to-animal.lib";
import { animalPageSchema } from "./animal.schema";
import type { Animal } from "../model/animal.model";
import type { AnimalSearchParams } from "./animal.type";

/** A converted page of animals plus the cursor to the next one. */
export interface AnimalPageResult {
  animals: Animal[];
  nextCursor: string | null;
  hasNext: boolean;
}

const parsePage = parseResponse(animalPageSchema, "GET /animals");

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
