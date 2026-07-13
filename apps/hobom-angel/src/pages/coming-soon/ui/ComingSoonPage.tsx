import * as stylex from "@stylexjs/stylex";
import { styles } from "./ComingSoonPage.styles";

/** Placeholder for consumer sections whose screens land in later PRs. */
export const ComingSoonPage = () => (
  <div {...stylex.props(styles.root)}>
    <span {...stylex.props(styles.emoji)} aria-hidden="true">
      🐾
    </span>
    <h2 {...stylex.props(styles.title)}>준비 중이에요</h2>
    <p {...stylex.props(styles.desc)}>이 화면은 곧 만나볼 수 있어요.</p>
  </div>
);
