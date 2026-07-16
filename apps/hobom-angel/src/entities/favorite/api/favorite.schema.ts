import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawFavorite } from "./favorite.type";

/** A single favorite reference on the wire. */
export const favoriteSchema: Schema<RawFavorite> = HoBomSchema.object({
  targetType: HoBomSchema.enum(["ANIMAL", "SHELTER"]),
  targetRef: HoBomSchema.string(),
  favoritedAt: HoBomSchema.string().nullable(),
});

/** `GET /favorites` — a plain array of favorite references. */
export const favoritesSchema: Schema<RawFavorite[]> = HoBomSchema.array(favoriteSchema);
