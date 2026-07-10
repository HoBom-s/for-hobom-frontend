import { HoBomSchema } from "hobom-schema";
import type { PaginatedItems } from "@/shared/api";
import type { Schema } from "hobom-schema";
import type { SpaceType } from "./wiki-space.type";

export const spaceSchema: Schema<SpaceType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  key: HoBomSchema.string(),
  name: HoBomSchema.string(),
  description: HoBomSchema.string().nullable(),
  createdAt: HoBomSchema.date(),
  updatedAt: HoBomSchema.date(),
});

export const spacesPageSchema: Schema<PaginatedItems<SpaceType>> = HoBomSchema.object({
  items: HoBomSchema.array(spaceSchema),
  totalCount: HoBomSchema.number(),
  offset: HoBomSchema.number(),
  limit: HoBomSchema.number(),
});
