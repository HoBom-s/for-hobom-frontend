import * as stylex from "@stylexjs/stylex";
import { styles } from "./LoginForm.styles";

/** Marketing panel shown beside the form on desktop. Presentational only. */
export const LoginBrandPanel = () => (
  <aside {...stylex.props(styles.brand)}>
    <span {...stylex.props(styles.blob)} aria-hidden="true" />
    <span {...stylex.props(styles.brandLogo)}>
      <span {...stylex.props(styles.brandLogoIcon)} aria-hidden="true">
        🐾
      </span>
      호봄엔젤
    </span>
    <div>
      <h1 {...stylex.props(styles.brandTitle)}>
        작은 생명에게
        <br />
        다시 봄이 오도록.
      </h1>
      <p {...stylex.props(styles.brandLead)}>
        입양·임시보호·봉사로 유기동물의 새로운 시작을 함께 만들어요.
      </p>
    </div>
    <span {...stylex.props(styles.brandStat)}>누적 입양 1,840+ · 함께하는 보호소 96곳</span>
  </aside>
);
