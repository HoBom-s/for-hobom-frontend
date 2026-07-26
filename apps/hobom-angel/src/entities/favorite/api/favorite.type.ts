import type { FavoriteTargetType } from "../model/favorite.model";

/** `GET /favorites` item, straight off the wire. */
export interface RawFavorite {
  targetType: FavoriteTargetType;
  targetRef: string;
  favoritedAt: string | null;
}
