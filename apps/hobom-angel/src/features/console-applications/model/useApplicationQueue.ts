import { useSuspenseInfiniteQuery } from "hobom-data";
import { applicationQueries } from "@/entities/application";
import type { ApplicationKind, ApplicationStatus } from "@/entities/application";

/** A shelter's application queue for one kind + status filter (cursor pages). */
export const useApplicationQueue = (
  shelterId: string,
  kind: ApplicationKind,
  status: ApplicationStatus | undefined,
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    applicationQueries.queue(shelterId, kind, status),
  );

  return {
    applications: data.pages.flatMap((page) => page.applications),
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
