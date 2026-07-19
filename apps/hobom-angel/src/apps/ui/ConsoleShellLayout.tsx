import { Link, NavLink, Outlet } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { ROUTES } from "@/shared/config";
import { RouteBoundary } from "@/shared/ui";
import { RouteFallback } from "./RouteFallback";
import { styles } from "./ConsoleShellLayout.styles";

/** The §07 console menu. Only 봉사 일정 is wired today; the rest are shown (per
 *  the design's 7-menu map) but disabled until their screens land. */
const MENU: { label: string; hint: string; to: string | null }[] = [
  { label: "동물 관리", hint: "등록·상태", to: ROUTES.CONSOLE_ANIMALS },
  { label: "신청 처리", hint: "심사·문의", to: null },
  { label: "봉사 일정", hint: "모집·승인", to: ROUTES.CONSOLE_VOLUNTEER },
  { label: "콘텐츠", hint: "공지·FAQ", to: ROUTES.CONSOLE_CONTENT },
  { label: "설문 빌더", hint: "폼 정의", to: null },
  { label: "스태프 관리", hint: "승격·역할", to: null },
  { label: "통계", hint: "KPI", to: ROUTES.CONSOLE_STATS },
];

/** Shelter console chrome (§07): a shelter-branded sidebar (the menu map) beside
 *  the active screen, with a clear way back to the consumer service. Separate
 *  from the consumer nav — this is the staff self-service surface. */
export const ConsoleShellLayout = () => (
  <div {...stylex.props(styles.root)}>
    <aside {...stylex.props(styles.sidebar)}>
      <div {...stylex.props(styles.brand)}>
        <span {...stylex.props(styles.logo)} aria-hidden />
        <span {...stylex.props(styles.brandText)}>
          <span {...stylex.props(styles.brandTitle)}>보호소 콘솔</span>
          <span {...stylex.props(styles.brandRole)}>관리자</span>
        </span>
      </div>

      <nav {...stylex.props(styles.nav)}>
        {MENU.map((item) =>
          item.to ? (
            <NavLink key={item.label} to={item.to} {...stylex.props(styles.itemLink)}>
              {({ isActive }) => (
                <span {...stylex.props(styles.item, isActive && styles.itemActive)}>
                  <span {...stylex.props(styles.itemLabel)}>{item.label}</span>
                  <span {...stylex.props(styles.itemHint)}>{item.hint}</span>
                </span>
              )}
            </NavLink>
          ) : (
            <span key={item.label} {...stylex.props(styles.itemLink)}>
              <span {...stylex.props(styles.item, styles.itemDisabled)}>
                <span {...stylex.props(styles.itemLabel)}>{item.label}</span>
                <span {...stylex.props(styles.itemSoon)}>준비 중</span>
              </span>
            </span>
          ),
        )}
      </nav>

      <div {...stylex.props(styles.foot)}>
        <span {...stylex.props(styles.scope)}>우리 보호소 정보만 관리할 수 있어요</span>
        <Link to={ROUTES.HOME} {...stylex.props(styles.exit)}>
          ← 서비스로 나가기
        </Link>
      </div>
    </aside>

    <main {...stylex.props(styles.main)}>
      <RouteBoundary fallback={<RouteFallback />}>
        <Outlet />
      </RouteBoundary>
    </main>
  </div>
);
