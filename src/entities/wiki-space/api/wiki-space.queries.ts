import { queryOptions } from "@tanstack/react-query";
import { fetchSpaces, fetchSpaceByKey } from "./wiki-space.api";

export const wikiSpaceQueries = {
  spaces: () => ["wiki-spaces"],

  list: (params?: { offset?: number; limit?: number }) =>
    queryOptions({
      queryKey: ["wiki-spaces", "list", params] as const,
      queryFn: () => fetchSpaces(params),
    }),

  detail: (key: string) =>
    queryOptions({
      queryKey: ["wiki-spaces", "detail", key] as const,
      queryFn: () => fetchSpaceByKey({ key }),
    }),
} as const;
