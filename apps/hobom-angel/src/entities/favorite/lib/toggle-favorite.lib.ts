import type { Favorite, FavoriteTargetType } from "../model/favorite.model";

/** Whether a target is in the favorites list. */
export const isFavorited = (favorites: Favorite[], targetRef: string): boolean =>
  favorites.some((favorite) => favorite.targetRef === targetRef);

/** Apply an optimistic toggle to a cached favorites list: prepend a placeholder
 *  when turning on (idempotent), drop it when turning off. Pure, so the
 *  optimistic mutation stays trivial and this can be unit-tested in isolation. */
export const applyFavoriteToggle = (
  favorites: Favorite[],
  targetType: FavoriteTargetType,
  targetRef: string,
  next: boolean,
): Favorite[] => {
  if (!next) {
    return favorites.filter((favorite) => favorite.targetRef !== targetRef);
  }

  if (isFavorited(favorites, targetRef)) return favorites;

  return [{ targetType, targetRef, favoritedAt: null }, ...favorites];
};
