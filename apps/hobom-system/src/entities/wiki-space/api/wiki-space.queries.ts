import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchSpaces, fetchSpaceByKey } from "./wiki-space.api";

export const wikiSpaceQueries = {
  spaces: () => ["wiki-spaces"],

  list: (params?: { offset?: number; limit?: number }) =>
    queryOptions({
      queryKey: ["wiki-spaces", "list", params] as const,
      queryFn: ({ signal }) => fetchSpaces(params, signal),
      ...CACHE_PROFILE.SLOW,
    }),

  detail: (key: string) =>
    queryOptions({
      queryKey: ["wiki-spaces", "detail", key] as const,
      queryFn: ({ signal }) => fetchSpaceByKey({ key }, signal),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
