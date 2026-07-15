import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { AnimalPage, RawAnimal, RawAnimalDetail } from "./animal.type";

const animalFields = {
  id: HoBomSchema.string(),
  shelterId: HoBomSchema.string(),
  name: HoBomSchema.string(),
  species: HoBomSchema.enum(["DOG", "CAT", "OTHER"]),
  description: HoBomSchema.string(),
  status: HoBomSchema.enum(["AVAILABLE", "RESERVED", "FOSTERED", "ADOPTED", "RETURNED"]),
  traits: HoBomSchema.object({
    sex: HoBomSchema.enum(["MALE", "FEMALE", "UNKNOWN"]),
    size: HoBomSchema.enum(["SMALL", "MEDIUM", "LARGE"]),
    ageMonths: HoBomSchema.number().nullable(),
    weightKg: HoBomSchema.number().nullable(),
    breed: HoBomSchema.string().nullable(),
    color: HoBomSchema.string().nullable(),
    personality: HoBomSchema.string().nullable(),
  }),
  photos: HoBomSchema.array(
    HoBomSchema.object({ objectKey: HoBomSchema.string(), caption: HoBomSchema.string().optional() }),
  ),
} as const;

const animalSchema: Schema<RawAnimal> = HoBomSchema.object(animalFields);

/** `GET /animals` response schema — validates the wire contract at the boundary. */
export const animalPageSchema: Schema<AnimalPage> = HoBomSchema.object({
  items: HoBomSchema.array(animalSchema),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});

/** `GET /shelters/:id/animals` — the shelter roster is a plain array, not a page. */
export const animalListSchema: Schema<RawAnimal[]> = HoBomSchema.array(animalSchema);

/** `GET /animals/:id` response schema — the list fields plus health and intake. */
export const animalDetailSchema: Schema<RawAnimalDetail> = HoBomSchema.object({
  ...animalFields,
  health: HoBomSchema.object({
    neutered: HoBomSchema.boolean(),
    vaccinated: HoBomSchema.boolean(),
    microchipId: HoBomSchema.string().nullable(),
    notes: HoBomSchema.string().nullable(),
  }),
  intake: HoBomSchema.object({
    intakeDate: HoBomSchema.string(),
    rescueStory: HoBomSchema.string().nullable(),
    noticeNumber: HoBomSchema.string().nullable(),
  }),
  shelter: HoBomSchema.object({
    id: HoBomSchema.string(),
    slug: HoBomSchema.string(),
    name: HoBomSchema.string(),
    region: HoBomSchema.string(),
    city: HoBomSchema.string().optional(),
  }).optional(),
});
