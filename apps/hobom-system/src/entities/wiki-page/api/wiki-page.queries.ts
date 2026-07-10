import { queryOptions, infiniteQueryOptions } from "hobom-data";
import {
  fetchPageTree,
  fetchPageById,
  fetchPageVersions,
  fetchPageVersion,
  fetchVersionDiff,
  fetchTrashPages,
  searchPages,
} from "./wiki-page.api";

const VERSIONS_PAGE_SIZE = 20;
const TRASH_PAGE_SIZE = 20;

export const wikiPageQueries = {
  pages: () => ["wiki-pages"],

  tree: (spaceKey: string) =>
    queryOptions({
      queryKey: ["wiki-pages", "tree", spaceKey] as const,
      queryFn: ({ signal }) => fetchPageTree({ spaceKey }, signal),
    }),

  detail: (spaceKey: string, pageId: string) =>
    queryOptions({
      queryKey: ["wiki-pages", "detail", spaceKey, pageId] as const,
      queryFn: ({ signal }) => fetchPageById({ spaceKey, pageId }, signal),
    }),

  versions: (spaceKey: string, pageId: string) =>
    infiniteQueryOptions({
      queryKey: ["wiki-pages", "versions", spaceKey, pageId] as const,
      queryFn: ({ pageParam, signal }) =>
        fetchPageVersions(
          {
            spaceKey,
            pageId,
            offset: pageParam,
            limit: VERSIONS_PAGE_SIZE,
          },
          signal,
        ),
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
      queryFn: ({ signal }) => fetchPageVersion({ spaceKey, pageId, version }, signal),
    }),

  versionDiff: (spaceKey: string, pageId: string, fromVersion: number, toVersion: number) =>
    queryOptions({
      queryKey: ["wiki-pages", "versionDiff", spaceKey, pageId, fromVersion, toVersion] as const,
      queryFn: ({ signal }) => fetchVersionDiff({ spaceKey, pageId, fromVersion, toVersion }, signal),
    }),

  trash: (spaceKey: string) =>
    infiniteQueryOptions({
      queryKey: ["wiki-pages", "trash", spaceKey] as const,
      queryFn: ({ pageParam, signal }) =>
        fetchTrashPages({ spaceKey, offset: pageParam, limit: TRASH_PAGE_SIZE }, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { offset, items, totalCount } = lastPage.items;
        const nextOffset = offset + items.length;

        return nextOffset < totalCount ? nextOffset : undefined;
      },
    }),

  search: (spaceKey: string, q: string) =>
    queryOptions({
      queryKey: ["wiki-pages", "search", spaceKey, q] as const,
      queryFn: ({ signal }) => searchPages({ q, spaceKey }, signal),
    }),
} as const;
