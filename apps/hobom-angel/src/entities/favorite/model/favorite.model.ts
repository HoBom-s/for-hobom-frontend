export type FavoriteTargetType = "ANIMAL" | "SHELTER";

/** A member's favorite — an animal (찜) or a shelter (팔로우). The list read
 *  returns only the reference; the target is hydrated separately. */
export interface Favorite {
  targetType: FavoriteTargetType;
  /** The favorited animal or shelter id. */
  targetRef: string;
  /** ISO datetime the favorite was added, or null. */
  favoritedAt: string | null;
}
