import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { toAnimal } from "../lib/to-animal.lib";
import { toAnimalDetail } from "../lib/to-animal-detail.lib";
import {
  animalDetailSchema,
  animalListSchema,
  animalPageSchema,
  registerAnimalSchema,
} from "./animal.schema";
import type { Animal, AnimalDetail } from "../model/animal.model";
import type {
  AnimalSearchParams,
  RegisterAnimalInput,
  RegisterAnimalResult,
  UpdateAnimalInput,
} from "./animal.type";

/** A converted page of animals plus the cursor to the next one. */
export interface AnimalPageResult {
  animals: Animal[];
  nextCursor: string | null;
  hasNext: boolean;
}

const parsePage = parseResponse(animalPageSchema, "GET /animals");
const parseList = parseResponse(animalListSchema, "GET /shelters/:id/animals");
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

/** Fetch a shelter's animal roster (§04, §07). The backend returns a plain array. */
export const getShelterAnimals = (shelterId: string, signal?: AbortSignal): Promise<Animal[]> =>
  httpClient
    .get(`/shelters/${shelterId}/animals`, { signal })
    .then(parseList)
    .then((items) => items.map(toAnimal));

/** Register a new animal for a shelter (§07 console, staff). */
export const registerAnimal = (
  shelterId: string,
  input: RegisterAnimalInput,
): Promise<RegisterAnimalResult> =>
  httpClient
    .post(`/shelters/${shelterId}/animals`, input)
    .then(parseResponse(registerAnimalSchema, "POST /shelters/:id/animals"));

/** Update an animal's profile (§07 console, staff). */
export const updateAnimal = (animalId: string, input: UpdateAnimalInput): Promise<void> =>
  httpClient.patch(`/animals/${animalId}`, input).then(() => undefined);
