import type {
  AnimalSex,
  AnimalSize,
  AnimalSort,
  AnimalSpecies,
  AnimalStatusCode,
} from "../model/animal.model";

interface RawAnimalTraits {
  sex: AnimalSex;
  size: AnimalSize;
  ageMonths: number | null;
  weightKg: number | null;
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

interface RawAnimalHealth {
  neutered: boolean;
  vaccinated: boolean;
  microchipId: string | null;
  notes: string | null;
}

interface RawAnimalIntake {
  intakeDate: string;
  rescueStory: string | null;
  noticeNumber: string | null;
}

/** `GET /animals/:id` — the list item plus health and intake history. */
export interface RawAnimalDetail extends RawAnimal {
  health: RawAnimalHealth;
  intake: RawAnimalIntake;
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
  sort?: AnimalSort;
  cursor?: string;
  limit?: number;
}
