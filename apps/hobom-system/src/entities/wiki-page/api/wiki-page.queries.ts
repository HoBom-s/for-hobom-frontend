import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import {
  fetchPageTree,
  fetchPageById,
  fetchPageVersions,
  fetchPageVersion,
  searchPages,
} from "./wiki-page.api";

const VERSIONS_PAGE_SIZE = 20;

export const wikiPageQueries = {
  pages: () => ["wiki-pages"],

  tree: (spaceKey: string) =>
    queryOptions({
      queryKey: ["wiki-pages", "tree", spaceKey] as const,
      queryFn: () => fetchPageTree({ spaceKey }),
    }),

  detail: (spaceKey: string, pageId: string) =>
    queryOptions({
      queryKey: ["wiki-pages", "detail", spaceKey, pageId] as const,
      queryFn: () => fetchPageById({ spaceKey, pageId }),
    }),

  versions: (spaceKey: string, pageId: string) =>
    infiniteQueryOptions({
      queryKey: ["wiki-pages", "versions", spaceKey, pageId] as const,
      queryFn: ({ pageParam }) =>
        fetchPageVersions({
          spaceKey,
          pageId,
          offset: pageParam,
          limit: VERSIONS_PAGE_SIZE,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { offset, items, totalCount } = lastPage.items;
        const nextOffset = offset + items.length;

        return nextOffset < totalCount ? nextOffset : undefined;
      },
    }),

  version: (spaceKey: string, pageId: string, version: number) =>
    queryOptions({
      queryKey: ["wiki-pages", "version", spaceKey, pageId, version] as const,
      queryFn: () => fetchPageVersion({ spaceKey, pageId, version }),
    }),

  search: (spaceKey: string, q: string) =>
    queryOptions({
      queryKey: ["wiki-pages", "search", spaceKey, q] as const,
      queryFn: () => searchPages({ q, spaceKey }),
    }),
} as const;
