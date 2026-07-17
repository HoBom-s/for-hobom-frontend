import { useQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { userQueries } from "@/entities/user";
import { styles } from "./VolunteerPostCard.styles";

interface PostAuthorProps {
  authorId: string;
  time: string;
}

/** Post author line — hydrates the nickname from the public profile (cached per
 *  author), falling back to a neutral label while it loads. */
export const PostAuthor = ({ authorId, time }: PostAuthorProps) => {
  const { data } = useQuery(userQueries.publicProfile(authorId));
  const nickname = data?.nickname ?? "봉사자";

  return (
    <div {...stylex.props(styles.authorRow)}>
      <Hb.Avatar
        style={{
          width: 36,
          height: 36,
          fontSize: "0.9rem",
          backgroundColor: "var(--hb-color-accent)",
          color: "var(--hb-color-accent-contrast)",
        }}
      >
        {nickname.charAt(0)}
      </Hb.Avatar>
      <div {...stylex.props(styles.authorMeta)}>
        <span {...stylex.props(styles.nickname)}>{nickname}</span>
        {time && <span {...stylex.props(styles.time)}>{time}</span>}
      </div>
    </div>
  );
};
