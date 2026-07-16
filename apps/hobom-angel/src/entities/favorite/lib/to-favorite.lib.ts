import type { RawFavorite } from "../api/favorite.type";
import type { Favorite } from "../model/favorite.model";

/** Anti-corruption: map the API favorite to the UI model (straight field copy,
 *  kept for consistency with the entity's other boundaries). */
export const toFavorite = (raw: RawFavorite): Favorite => ({
  targetType: raw.targetType,
  targetRef: raw.targetRef,
  favoritedAt: raw.favoritedAt,
});
