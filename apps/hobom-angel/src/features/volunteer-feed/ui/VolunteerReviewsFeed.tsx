import { FavoriteBorder } from "hobom-design-system/icons";
import { useInfiniteScroll } from "@/shared/model";
import { usePostReactions } from "../model/usePostReactions";
import { useVolunteerFeed } from "../model/useVolunteerFeed";
import { ReviewGrid } from "./ReviewGrid";

const EMPTY_ICON = (
  <FavoriteBorder style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />
);

/** §05 봉사 후기 피드: an infinite grid of compact review tiles with optimistic
 *  like / bookmark; a tile opens the detail modal (images + comments). */
export const VolunteerReviewsFeed = () => {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } = useVolunteerFeed();
  const reactions = usePostReactions();
  const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <ReviewGrid
      posts={posts}
      reactions={reactions}
      sentinelRef={sentinelRef}
      isFetchingNextPage={isFetchingNextPage}
      emptyIcon={EMPTY_ICON}
      emptyMessage="아직 등록된 봉사 후기가 없어요. 첫 후기를 남겨보세요."
    />
  );
};
