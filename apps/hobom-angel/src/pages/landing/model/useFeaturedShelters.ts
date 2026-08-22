// 랜딩에 노출할 공개 보호소 목록을 비로그인 상태에서 가져오는 훅
import { useInfiniteQuery } from "hobom-data";
import { shelterQueries } from "@/entities/shelter";
import type { ShelterListItem } from "@/entities/shelter";

const LIMIT = 4;

/**
 * The landing's shelter showcase. `/shelters` is one of the few endpoints an
 * anonymous visitor may read, so it — not `/animals` — backs the public teaser.
 *
 * Non-suspense on purpose: the landing route has no boundary of its own, so a
 * slow or failing call must degrade inside this section instead of suspending
 * or tearing down the whole page.
 */
export const useFeaturedShelters = () => {
  const { data, status } = useInfiniteQuery(shelterQueries.list());

  const shelters: ShelterListItem[] = (data?.pages.flatMap((page) => page.shelters) ?? []).slice(
    0,
    LIMIT,
  );

  return { shelters, status };
};
