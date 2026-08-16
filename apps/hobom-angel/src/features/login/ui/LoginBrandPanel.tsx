import * as stylex from "@stylexjs/stylex";
import { styles } from "./LoginForm.styles";
import brandPhoto from "./assets/auth-hero.svg";

/** Photo-first brand hero shown beside the form on desktop. Presentational only. */
export const LoginBrandPanel = () => (
  <aside {...stylex.props(styles.brand)}>
    <img src={brandPhoto} alt="" {...stylex.props(styles.brandPhoto)} aria-hidden="true" />
    <span {...stylex.props(styles.brandScrim)} aria-hidden="true" />
    <span {...stylex.props(styles.brandLogo)}>
      <span {...stylex.props(styles.brandLogoIcon)} aria-hidden="true">
        🐾
      </span>
      호봄엔젤
    </span>
    <div>
      <span {...stylex.props(styles.brandKicker)}>
        <span {...stylex.props(styles.brandKickerDot)} aria-hidden="true" />
        SHELTER & HOME
      </span>
      <h1 {...stylex.props(styles.brandTitle)}>
        작은 생명에게
        <br />
        다시 봄이 오도록.
      </h1>
      <p {...stylex.props(styles.brandLead)}>
        입양·임시보호·봉사로 유기동물의 새로운 시작을 함께 만들어요.
      </p>
    </div>
    <div {...stylex.props(styles.proofChip)}>
      <span {...stylex.props(styles.proofValue)}>1,840+</span>
      <span {...stylex.props(styles.proofLabel)}>가족을 찾았어요 · 보호소 96곳</span>
    </div>
  </aside>
);
