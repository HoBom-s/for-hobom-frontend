import type {
  AnimalSex,
  AnimalSize,
  AnimalSort,
  AnimalSpecies,
  AnimalStatusCode,
  PlacementType,
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
  eligiblePlacements: PlacementType[];
  traits: RawAnimalTraits;
  /** The list also carries these; the detail endpoint always fills them. */
  health?: RawAnimalHealth;
  intake?: RawAnimalIntake;
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

interface RawShelterSummary {
  id: string;
  slug: string;
  name: string;
  region: string;
  city?: string;
}

/** `GET /animals/:id` — the list item plus health, intake, and the shelter. */
export interface RawAnimalDetail extends RawAnimal {
  health: RawAnimalHealth;
  intake: RawAnimalIntake;
  shelter?: RawShelterSummary;
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
  placement?: PlacementType;
  keyword?: string;
  sort?: AnimalSort;
  cursor?: string;
  limit?: number;
}

/** Traits payload for register/update (console, staff). */
export interface AnimalTraitsInput {
  sex: AnimalSex;
  size: AnimalSize;
  ageMonths?: number;
  weightKg?: number;
  breed?: string;
  color?: string;
  personality?: string;
}

export interface AnimalHealthInput {
  neutered: boolean;
  vaccinated: boolean;
  microchipId?: string;
  notes?: string;
}

/** `POST /shelters/:shelterId/animals` request (staff). */
export interface RegisterAnimalInput {
  name: string;
  species: AnimalSpecies;
  description?: string;
  traits: AnimalTraitsInput;
  health: AnimalHealthInput;
  intake: { intakeDate: string; rescueStory?: string; noticeNumber?: string };
  photos?: { objectKey: string; caption?: string }[];
}

/** `PATCH /animals/:animalId` request (staff) — profile only (no intake/photos). */
export interface UpdateAnimalInput {
  name: string;
  species: AnimalSpecies;
  description?: string;
  traits: AnimalTraitsInput;
  health: AnimalHealthInput;
}

/** `POST /shelters/:shelterId/animals` response. */
export interface RegisterAnimalResult {
  animalId: string;
}
