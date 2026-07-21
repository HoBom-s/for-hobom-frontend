import { httpClient, parseResponse } from "@/shared/api";
import { toFavorite } from "../lib/to-favorite.lib";
import { favoritesPageSchema } from "./favorite.schema";
import type { Favorite, FavoriteTargetType } from "../model/favorite.model";

/** Fetch the current user's favorites of one type (찜 animals or 팔로우 shelters).
 *  Cursor-paginated upstream; the list surfaces the first page. */
export const getFavorites = (
  targetType: FavoriteTargetType,
  signal?: AbortSignal,
): Promise<Favorite[]> =>
  httpClient
    .get(`/favorites?targetType=${targetType}`, { signal })
    .then(parseResponse(favoritesPageSchema, "GET /favorites"))
    .then((page) => page.items.map(toFavorite));

/** Add a favorite (idempotent — requires auth, no response body). */
export const addFavorite = (targetType: FavoriteTargetType, targetRef: string): Promise<void> =>
  httpClient.post("/favorites", { targetType, targetRef }).then(() => undefined);

/** Remove a favorite (requires auth, no response body). */
export const removeFavorite = (
  targetType: FavoriteTargetType,
  targetRef: string,
): Promise<void> =>
  httpClient.delete(`/favorites/${targetType}/${targetRef}`).then(() => undefined);
