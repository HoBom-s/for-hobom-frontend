import { useQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { userQueries } from "@/entities/user";
import type { Comment } from "@/entities/volunteer-post";
import { styles } from "./PostDetailModal.styles";

/** A single comment — "nickname body", author hydrated from the public profile. */
export const CommentItem = ({ comment }: { comment: Comment }) => {
  const { data } = useQuery(userQueries.publicProfile(comment.authorId));

  return (
    <div {...stylex.props(styles.comment)}>
      <span {...stylex.props(styles.commentAuthor)}>{data?.nickname ?? "봉사자"}</span>
      <span {...stylex.props(styles.commentBody)}>{comment.body}</span>
    </div>
  );
};
