import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { AnimalPage, RawAnimal } from "./animal.type";

const animalSchema: Schema<RawAnimal> = HoBomSchema.object({
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
    breed: HoBomSchema.string().nullable(),
    color: HoBomSchema.string().nullable(),
    personality: HoBomSchema.string().nullable(),
  }),
  photos: HoBomSchema.array(
    HoBomSchema.object({ objectKey: HoBomSchema.string(), caption: HoBomSchema.string().optional() }),
  ),
});

/** `GET /animals` response schema — validates the wire contract at the boundary. */
export const animalPageSchema: Schema<AnimalPage> = HoBomSchema.object({
  items: HoBomSchema.array(animalSchema),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});
