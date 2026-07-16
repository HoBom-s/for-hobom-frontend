import { queryOptions } from "hobom-data";
import { getFavorites } from "./favorite.api";
import type { FavoriteTargetType } from "../model/favorite.model";

export const favoriteQueries = {
  all: () => ["favorites"] as const,

  list: (targetType: FavoriteTargetType) =>
    queryOptions({
      queryKey: [...favoriteQueries.all(), targetType] as const,
      queryFn: ({ signal }) => getFavorites(targetType, signal),
    }),
} as const;
