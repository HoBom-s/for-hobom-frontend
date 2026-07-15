export type AnimalSpecies = "DOG" | "CAT" | "OTHER";
export type AnimalSex = "MALE" | "FEMALE" | "UNKNOWN";
export type AnimalSize = "SMALL" | "MEDIUM" | "LARGE";
export type AnimalStatusCode = "AVAILABLE" | "RESERVED" | "FOSTERED" | "ADOPTED" | "RETURNED";
export type AnimalSort = "LATEST" | "OLDEST";

/** The animal the UI renders — a flattened, display-ready view of the API model. */
export interface Animal {
  id: string;
  shelterId: string;
  name: string;
  species: AnimalSpecies;
  status: AnimalStatusCode;
  sex: AnimalSex;
  size: AnimalSize;
  ageMonths: number | null;
  breed: string | null;
  description: string;
  photoUrl?: string;
}

export const SPECIES_LABEL: Record<AnimalSpecies, string> = {
  DOG: "강아지",
  CAT: "고양이",
  OTHER: "기타",
};

export const SIZE_LABEL: Record<AnimalSize, string> = {
  SMALL: "소형",
  MEDIUM: "중형",
  LARGE: "대형",
};

export const SEX_LABEL: Record<AnimalSex, string> = {
  MALE: "수컷",
  FEMALE: "암컷",
  UNKNOWN: "미상",
};

export const SORT_LABEL: Record<AnimalSort, string> = {
  LATEST: "최신순",
  OLDEST: "오래된순",
};

/** Display label for a status; matches the AnimalCard chip labels. */
export type AnimalStatusLabel = "입양가능" | "예약중" | "임보중" | "입양완료" | "반환";

export const STATUS_LABEL: Record<AnimalStatusCode, AnimalStatusLabel> = {
  AVAILABLE: "입양가능",
  RESERVED: "예약중",
  FOSTERED: "임보중",
  ADOPTED: "입양완료",
  RETURNED: "반환",
};

/** Health record shown in the §02 detail attribute grid. */
export interface AnimalHealth {
  neutered: boolean;
  vaccinated: boolean;
  microchipId: string | null;
  notes: string | null;
}

/** Rescue/intake history shown in the §02 detail attribute grid. */
export interface AnimalIntake {
  intakeDate: string;
  rescueStory: string | null;
  noticeNumber: string | null;
}

/** The owning shelter, summarized on the animal detail (region always public;
 *  city follows the shelter's address disclosure policy). */
export interface AnimalShelter {
  id: string;
  slug: string;
  name: string;
  region: string;
  city: string | null;
}

/** Full §02 detail view: the flattened card model plus the complete photo set,
 *  health, intake, the owning shelter, and the trait fields the list omits. */
export interface AnimalDetail extends Animal {
  photos: string[];
  weightKg: number | null;
  color: string | null;
  personality: string | null;
  health: AnimalHealth;
  intake: AnimalIntake;
  shelter: AnimalShelter | null;
}

/** Age in months → a friendly Korean label. */
export const formatAge = (months: number | null): string => {
  if (months == null) return "나이 미상";
  if (months < 12) return `${months}개월`;

  return `${Math.floor(months / 12)}살`;
};

/** The card's attribute line per §01, e.g. "푸들 · 2살 · 소형" (breed · age · size).
 *  Region is added once the shelter join is available. */
export const animalMeta = (animal: Animal): string =>
  [animal.breed, formatAge(animal.ageMonths), SIZE_LABEL[animal.size]]
    .filter(Boolean)
    .join(" · ");
