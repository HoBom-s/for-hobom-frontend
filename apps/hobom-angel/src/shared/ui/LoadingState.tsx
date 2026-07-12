import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./LoadingState.styles";

interface LoadingStateProps {
  fullScreen?: boolean;
}

/** Full/section loading — spinner + label, per the design's Loading state. */
export const LoadingState = ({ fullScreen = false }: LoadingStateProps) => (
  <div
    {...stylex.props(styles.root, fullScreen && styles.fullScreen)}
    role="status"
    aria-live="polite"
  >
    <Hb.Progress.Circular />
    <span {...stylex.props(styles.text)}>불러오는 중...</span>
  </div>
);
