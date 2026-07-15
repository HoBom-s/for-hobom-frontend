import { Link } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { ROUTES } from "@/shared/config";
import { PRIMARY_NAV } from "../model/nav-items";
import { styles } from "./GlobalFooter.styles";

const YEAR = new Date().getFullYear();

const LINKS = [
  ...PRIMARY_NAV,
  { label: "이용약관", to: ROUTES.TERMS },
  { label: "개인정보처리방침", to: ROUTES.PRIVACY },
];

/** Desktop-only global footer (§0.5) — one concise row. Hidden on mobile,
 *  where the bottom tab carries navigation. */
export const GlobalFooter = () => (
  <footer {...stylex.props(styles.root)}>
    <div {...stylex.props(styles.inner)}>
      <div {...stylex.props(styles.identity)}>
        <span {...stylex.props(styles.brand)}>🐾 호봄엔젤</span>
        <span {...stylex.props(styles.copyright)}>© {YEAR}</span>
      </div>

      <nav {...stylex.props(styles.nav)} aria-label="바로가기">
        {LINKS.map((item) => (
          <Link key={item.to} to={item.to} {...stylex.props(styles.link)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  </footer>
);
