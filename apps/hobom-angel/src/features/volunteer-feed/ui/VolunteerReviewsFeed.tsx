import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { FavoriteBorder } from "hobom-design-system/icons";
import { useInfiniteScroll, useOverlay } from "@/shared/model";
import type { VolunteerPost } from "@/entities/volunteer-post";
import { usePostReactions } from "../model/usePostReactions";
import { useVolunteerFeed } from "../model/useVolunteerFeed";
import { PostDetailModal } from "./PostDetailModal";
import { VolunteerPostCard } from "./VolunteerPostCard";
import { styles } from "./VolunteerReviewsFeed.styles";

/** §05 봉사 후기 피드: an infinite list of compact review cards with optimistic
 *  like / bookmark; a card opens the detail modal (images + comments). */
export const VolunteerReviewsFeed = () => {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } = useVolunteerFeed();
  const reactions = usePostReactions();
  const overlay = useOverlay();
  const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

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
        <EmptyState
          icon={<FavoriteBorder style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />}
          message="아직 등록된 봉사 후기가 없어요. 첫 후기를 남겨보세요."
        />
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
