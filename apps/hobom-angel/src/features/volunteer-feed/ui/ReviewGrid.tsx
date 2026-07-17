import type { ReactNode, RefObject } from "react";
import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { useOverlay } from "@/shared/model";
import type { VolunteerPost } from "@/entities/volunteer-post";
import { PostDetailModal } from "./PostDetailModal";
import { VolunteerPostCard } from "./VolunteerPostCard";
import { styles } from "./VolunteerReviewsFeed.styles";
import type { usePostReactions } from "../model/usePostReactions";

interface ReviewGridProps {
  posts: VolunteerPost[];
  reactions: ReturnType<typeof usePostReactions>;
  sentinelRef: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
  emptyIcon: ReactNode;
  emptyMessage: string;
}

/** The square-thumbnail review grid shared by the feed and the saved-reviews
 *  tab: a tile opens the detail modal (images + comments) with optimistic
 *  like / bookmark, and scrolls within a capped area for infinite loading. */
export const ReviewGrid = ({
  posts,
  reactions,
  sentinelRef,
  isFetchingNextPage,
  emptyIcon,
  emptyMessage,
}: ReviewGridProps) => {
  const overlay = useOverlay();

  const openDetail = (post: VolunteerPost) =>
    overlay.open(({ close }) => (
      <PostDetailModal
        post={post}
        onToggleLike={reactions.toggleLike}
        onToggleBookmark={reactions.toggleBookmark}
        onClose={close}
      />
    ));

  if (posts.length === 0) {
    return (
      <div {...stylex.props(styles.empty)}>
        <EmptyState icon={emptyIcon} message={emptyMessage} />
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.scroll)}>
        <div {...stylex.props(styles.list)}>
          {posts.map((post) => (
            <VolunteerPostCard key={post.id} post={post} onOpen={() => openDetail(post)} />
          ))}
        </div>
        <div ref={sentinelRef} />
        {isFetchingNextPage && <p {...stylex.props(styles.more)}>더 불러오는 중…</p>}
      </div>
    </div>
  );
};
