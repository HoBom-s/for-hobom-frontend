import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./ApplyAdoption.styles";

interface ApplyNavProps {
  canPrev: boolean;
  isReview: boolean;
  isSubmitting: boolean;
  onPrev: () => void;
  onNext: () => void;
}

/** Bottom action bar (mobile) / inline nav (desktop): 이전 + 다음/신청하기. */
export const ApplyNav = ({ canPrev, isReview, isSubmitting, onPrev, onNext }: ApplyNavProps) => (
  <div {...stylex.props(styles.nav)}>
    {canPrev && (
      <div {...stylex.props(styles.navGrow)}>
        <Hb.Button variant="secondary" fullWidth onClick={onPrev}>
          이전
        </Hb.Button>
      </div>
    )}
    <div {...stylex.props(styles.navGrow)}>
      <Hb.Button variant="primary" fullWidth loading={isSubmitting} onClick={onNext}>
        {isReview ? "신청하기" : "다음"}
      </Hb.Button>
    </div>
  </div>
);
