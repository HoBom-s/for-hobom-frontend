import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./ErrorState.styles";

interface ErrorStateProps {
  /** Retry handler; defaults to a full reload. */
  onRetry?: () => void;
}

/** Generic error state matching the design's error-recovery card. */
export const ErrorState = ({ onRetry }: ErrorStateProps) => (
  <div {...stylex.props(styles.root)} role="alert">
    <span {...stylex.props(styles.icon)} aria-hidden="true">
      !
    </span>
    <h2 {...stylex.props(styles.title)}>일시적인 오류가 발생했어요</h2>
    <p {...stylex.props(styles.desc)}>잠시 후 다시 시도해주세요. 문제가 계속되면 문의해주세요.</p>
    <Hb.Button variant="primary" onClick={onRetry ?? (() => window.location.reload())}>
      다시 시도
    </Hb.Button>
  </div>
);
