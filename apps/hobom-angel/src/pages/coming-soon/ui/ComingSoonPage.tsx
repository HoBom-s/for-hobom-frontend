import * as stylex from "@stylexjs/stylex";
import { styles } from "./ComingSoonPage.styles";

/** Placeholder for consumer sections whose screens land in later PRs. */
export const ComingSoonPage = () => (
  <div {...stylex.props(styles.root)}>
    <div {...stylex.props(styles.block)}>
      <span {...stylex.props(styles.disc)} aria-hidden="true">
        🐾
      </span>
      <span {...stylex.props(styles.kicker)}>
        <span {...stylex.props(styles.kickerDot)} aria-hidden="true" />
        준비 중
      </span>
      <h2 {...stylex.props(styles.title)}>준비 중이에요</h2>
      <p {...stylex.props(styles.desc)}>이 화면은 곧 만나볼 수 있어요.</p>
    </div>
  </div>
);
