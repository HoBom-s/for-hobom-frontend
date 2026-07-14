import type { AnimalSex, AnimalSize, AnimalSpecies, AnimalStatusCode } from "../model/animal.model";

interface RawAnimalTraits {
  sex: AnimalSex;
  size: AnimalSize;
  ageMonths: number | null;
  breed: string | null;
  color: string | null;
  personality: string | null;
}

/** `GET /animals` item — the fields the list/detail actually use. */
export interface RawAnimal {
  id: string;
  shelterId: string;
  name: string;
  species: AnimalSpecies;
  description: string;
  status: AnimalStatusCode;
  traits: RawAnimalTraits;
  photos: { objectKey: string; caption?: string }[];
}

/** Cursor page envelope for the animal list. */
export interface AnimalPage {
  items: RawAnimal[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface AnimalSearchParams {
  species?: AnimalSpecies;
  size?: AnimalSize;
  sex?: AnimalSex;
  status?: AnimalStatusCode;
  keyword?: string;
  cursor?: string;
  limit?: number;
}
