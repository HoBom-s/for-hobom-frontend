import * as stylex from "@stylexjs/stylex";
import { Favorite } from "hobom-design-system/icons";
import { mediaUrl } from "@/shared/lib";
import type { VolunteerPost } from "@/entities/volunteer-post";
import { styles } from "./VolunteerPostCard.styles";
import { postImageKeys, postText } from "../lib/post-content.lib";

interface VolunteerPostCardProps {
  post: VolunteerPost;
  /** Open the detail modal (full text, images, comments). */
  onOpen: () => void;
}

/** A feed grid tile — a square thumbnail (or text preview) that opens the detail
 *  modal, with a like/comment count overlay on hover (profile-style grid). */
export const VolunteerPostCard = ({ post, onOpen }: VolunteerPostCardProps) => {
  const [first] = postImageKeys(post.content);

  return (
    <button type="button" {...stylex.props(styles.tile)} onClick={onOpen} aria-label="후기 상세 보기">
      {first ? (
        <img src={mediaUrl(first)} alt="" {...stylex.props(styles.tileImg)} />
      ) : (
        <span {...stylex.props(styles.textTile)}>{postText(post.content)}</span>
      )}
      <span {...stylex.props(styles.overlay)}>
        <span {...stylex.props(styles.overlayItem)}>
          <Favorite fontSize="small" />
          {post.likeCount}
        </span>
        <span {...stylex.props(styles.overlayItem)}>댓글 {post.commentCount}</span>
      </span>
    </button>
  );
};
