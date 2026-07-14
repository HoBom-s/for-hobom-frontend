export type AnimalSpecies = "DOG" | "CAT" | "OTHER";
export type AnimalSex = "MALE" | "FEMALE" | "UNKNOWN";
export type AnimalSize = "SMALL" | "MEDIUM" | "LARGE";
export type AnimalStatusCode = "AVAILABLE" | "RESERVED" | "FOSTERED" | "ADOPTED" | "RETURNED";

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

/** Display label for a status; matches the AnimalCard chip labels. */
export type AnimalStatusLabel = "입양가능" | "예약중" | "임보중" | "입양완료" | "반환";

export const STATUS_LABEL: Record<AnimalStatusCode, AnimalStatusLabel> = {
  AVAILABLE: "입양가능",
  RESERVED: "예약중",
  FOSTERED: "임보중",
  ADOPTED: "입양완료",
  RETURNED: "반환",
};

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
