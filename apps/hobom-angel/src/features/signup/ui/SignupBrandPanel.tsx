// 회원가입 화면에 Claude Design의 녹색 브랜드 메시지와 사진을 제공하는 패널
import * as stylex from "@stylexjs/stylex";
import { styles } from "./SignupFunnel.styles";
import brandPhoto from "./assets/signup-hero.svg";

const Paw = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="6.4" cy="7" r="2.1" />
    <circle cx="11" cy="4.8" r="2.2" />
    <circle cx="15.8" cy="6.1" r="2.1" />
    <circle cx="18.4" cy="10.2" r="2" />
    <path d="M7.2 15.1c.4-3 2.7-5.2 5.4-5.2 2.9 0 5.3 2.5 5.3 5.6 0 2.3-1.5 3.8-3.7 3.8-1 0-1.8-.4-2.6-.4-.8 0-1.8.6-2.8.6-2 0-3.2-1.4-3.2-3.1 0-.6.3-1 .7-1.3.3-.2.6-.1.9 0Z" />
  </svg>
);

export const SignupBrandPanel = () => (
  <aside {...stylex.props(styles.brand)}>
    <span {...stylex.props(styles.brandLogo)}>
      <span {...stylex.props(styles.brandLogoIcon)}>
        <Paw />
      </span>
      호봄엔젤
    </span>
    <div>
      <h1 {...stylex.props(styles.brandTitle)}>새로운 가족을 만나는 여정에 함께해주세요.</h1>
      <p {...stylex.props(styles.brandLead)}>
        가입하면 관심 있는 동물을 저장하고 입양·임시보호·봉사 신청을 관리할 수 있어요.
      </p>
    </div>
    <div {...stylex.props(styles.brandPhotoFrame)}>
      <img src={brandPhoto} alt="" {...stylex.props(styles.brandPhoto)} aria-hidden="true" />
    </div>
  </aside>
);
