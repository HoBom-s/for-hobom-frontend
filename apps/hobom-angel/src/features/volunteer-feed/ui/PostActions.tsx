import * as stylex from "@stylexjs/stylex";
import { BookmarkOutlined, Favorite, FavoriteBorder } from "hobom-design-system/icons";
import type { VolunteerPost } from "@/entities/volunteer-post";
import { styles } from "./VolunteerPostCard.styles";

interface PostActionsProps {
  post: VolunteerPost;
  onToggleLike: () => void;
  onToggleBookmark: () => void;
  onComment: () => void;
}

/** Like / comment / bookmark row, shared by the feed card and the detail modal. */
export const PostActions = ({ post, onToggleLike, onToggleBookmark, onComment }: PostActionsProps) => (
  <div {...stylex.props(styles.actions)}>
    <button
      type="button"
      aria-label="좋아요"
      aria-pressed={post.liked}
      {...stylex.props(styles.action, post.liked && styles.liked)}
      onClick={onToggleLike}
    >
      {post.liked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
      {post.likeCount}
    </button>
    <button type="button" aria-label="댓글" {...stylex.props(styles.action)} onClick={onComment}>
      댓글 {post.commentCount}
    </button>
    <button
      type="button"
      aria-label="저장"
      aria-pressed={post.bookmarked}
      {...stylex.props(styles.action, styles.pushRight, post.bookmarked && styles.bookmarked)}
      onClick={onToggleBookmark}
    >
      <BookmarkOutlined fontSize="small" />
    </button>
  </div>
);
