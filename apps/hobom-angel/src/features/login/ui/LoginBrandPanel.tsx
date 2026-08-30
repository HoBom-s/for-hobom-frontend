// 로그인 화면의 브랜드 메시지와 주요 활동 안내 패널
import * as stylex from "@stylexjs/stylex";
import { styles } from "./LoginForm.styles";

const Paw = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="6.4" cy="7" r="2.1" />
    <circle cx="11" cy="4.8" r="2.2" />
    <circle cx="15.8" cy="6.1" r="2.1" />
    <circle cx="18.4" cy="10.2" r="2" />
    <path d="M7.2 15.1c.4-3 2.7-5.2 5.4-5.2 2.9 0 5.3 2.5 5.3 5.6 0 2.3-1.5 3.8-3.7 3.8-1 0-1.8-.4-2.6-.4-.8 0-1.8.6-2.8.6-2 0-3.2-1.4-3.2-3.1 0-.6.3-1 .7-1.3.3-.2.6-.1.9 0Z" />
  </svg>
);

const ActivityGlyph = ({ path }: { path: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={path}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const activityItems = [
  {
    path: "M20.8 5.8a5.4 5.4 0 0 0-7.6 0L12 7l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 22l8.8-8.6a5.4 5.4 0 0 0 0-7.6Z",
    title: "관심 동물",
    description: "찜한 아이를 다시 만나보세요",
  },
  {
    path: "M9 5H6.8A1.8 1.8 0 0 0 5 6.8v12.4A1.8 1.8 0 0 0 6.8 21h10.4a1.8 1.8 0 0 0 1.8-1.8V6.8A1.8 1.8 0 0 0 17.2 5H15M9 5a3 3 0 0 1 6 0M9 5h6m-6 5h6m-6 4h4",
    title: "신청 내역",
    description: "입양·임시보호 진행을 확인해요",
  },
  {
    path: "M7 3v3m10-3v3M5.8 5h12.4A1.8 1.8 0 0 1 20 6.8v11.4a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 18.2V6.8A1.8 1.8 0 0 1 5.8 5ZM4 9h16m-12 4h3m2 0h3m-8 3h3",
    title: "봉사 일정",
    description: "다가오는 일정을 놓치지 않아요",
  },
];

export const LoginBrandPanel = () => (
  <aside {...stylex.props(styles.brand)}>
    <span {...stylex.props(styles.brandLogo)}>
      <span {...stylex.props(styles.brandLogoIcon)}>
        <Paw />
      </span>
      호봄엔젤
    </span>
    <div>
      <h1 {...stylex.props(styles.brandTitle)}>기다리는 아이들의 이름을 먼저 불러주세요.</h1>
      <p {...stylex.props(styles.brandLead)}>
        로그인하면 찜한 동물과 신청 내역, 봉사 일정을 한곳에서 관리할 수 있어요.
      </p>
    </div>
    <section {...stylex.props(styles.activityCard)} aria-label="로그인 후 이용할 수 있는 기능">
      <div {...stylex.props(styles.activityHeader)}>
        <span {...stylex.props(styles.activityHeaderDot)} />
        로그인하면 이어서 할 수 있어요
      </div>
      <ul {...stylex.props(styles.activityList)}>
        {activityItems.map(({ path, title, description }) => (
          <li key={title} {...stylex.props(styles.activityItem)}>
            <span {...stylex.props(styles.activityIcon)}>
              <ActivityGlyph path={path} />
            </span>
            <span {...stylex.props(styles.activityCopy)}>
              <strong {...stylex.props(styles.activityTitle)}>{title}</strong>
              <span {...stylex.props(styles.activityDescription)}>{description}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  </aside>
);
