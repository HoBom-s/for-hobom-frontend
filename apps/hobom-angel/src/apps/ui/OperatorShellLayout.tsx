import { Link, Outlet } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { ROUTES } from "@/shared/config";
import { RouteBoundary } from "@/shared/ui";
import { RouteFallback } from "./RouteFallback";
import { styles } from "./OperatorShellLayout.styles";

const YEAR = new Date().getFullYear();

/** §09 운영자 콘솔 chrome — a slim branded top bar with a clear way back to the
 *  consumer service, plus a footer. The operator surface is separate from both
 *  the consumer nav and the shelter console. */
export const OperatorShellLayout = () => (
  <div {...stylex.props(styles.root)}>
    <header {...stylex.props(styles.header)}>
      <span {...stylex.props(styles.brand)}>
        <span {...stylex.props(styles.logo)} aria-hidden />
        <span {...stylex.props(styles.brandName)}>운영자 콘솔</span>
        <span {...stylex.props(styles.roleChip)}>OPERATOR</span>
      </span>
      <span {...stylex.props(styles.spacer)} />
      <Link to={ROUTES.HOME} {...stylex.props(styles.back)}>
        ← 호봄 엔젤로
      </Link>
    </header>

    <main {...stylex.props(styles.main)}>
      <RouteBoundary fallback={<RouteFallback />}>
        <Outlet />
      </RouteBoundary>
    </main>

    <footer {...stylex.props(styles.footer)}>
      <span {...stylex.props(styles.footText)}>
        © {YEAR} 호봄엔젤 운영자 콘솔 · 내부 운영 도구
      </span>
    </footer>
  </div>
);
