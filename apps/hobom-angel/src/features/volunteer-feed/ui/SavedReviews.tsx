import { BookmarkOutlined } from "hobom-design-system/icons";
import { volunteerPostQueries } from "@/entities/volunteer-post";
import { useInfiniteScroll } from "@/shared/model";
import { usePostReactions } from "../model/usePostReactions";
import { useSavedReviews } from "../model/useSavedReviews";
import { ReviewGrid } from "./ReviewGrid";

const EMPTY_ICON = (
  <BookmarkOutlined style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />
);

/** 저장한 후기: the reviews the viewer bookmarked, as the same tile grid + detail
 *  modal as the feed. Reactions patch the saved-reviews list so unbookmarking
 *  reflects here too. */
export const SavedReviews = () => {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } = useSavedReviews();
  const reactions = usePostReactions(volunteerPostQueries.myBookmarks());
  const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <ReviewGrid
      posts={posts}
      reactions={reactions}
      sentinelRef={sentinelRef}
      isFetchingNextPage={isFetchingNextPage}
      emptyIcon={EMPTY_ICON}
      emptyMessage="저장한 후기가 없어요. 마음에 드는 후기를 저장해 보세요."
    />
  );
};
