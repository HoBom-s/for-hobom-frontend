import { useState, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { styles } from "./PublicShell.styles";

export interface PublicShellNavItem {
  label: string;
  href: string;
}

interface PublicShellProps {
  /** Brand lockup shown at the start of the bar. */
  brand: ReactNode;
  /** Primary navigation links. */
  nav?: readonly PublicShellNavItem[];
  /** Trailing bar content, e.g. a login button. */
  actions?: ReactNode;
  /** Footer content; wrapped in the shell's footer container. */
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Mobile-first public chrome for the consumer surface: a sticky top bar with
 * brand + primary nav + trailing actions (with a mobile menu), plus a footer
 * slot. The desktop back-office `AppShell` (240px drawer) is unsuitable here.
 */
export const PublicShell = ({ brand, nav = [], actions, footer, children }: PublicShellProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div {...stylex.props(styles.shell)}>
      <header {...stylex.props(styles.bar)}>
        <div {...stylex.props(styles.barInner)}>
          <a href="#top" {...stylex.props(styles.brand)}>
            {brand}
          </a>

          <nav {...stylex.props(styles.nav)} aria-label="주요 메뉴">
            {nav.map((item) => (
              <a key={item.label} href={item.href} {...stylex.props(styles.navLink)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div {...stylex.props(styles.actions)}>
            {actions}
            {nav.length > 0 && (
              <button
                type="button"
                {...stylex.props(styles.burger)}
                aria-label="메뉴 열기"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {menuOpen && nav.length > 0 && (
          <nav {...stylex.props(styles.mobileNav)} aria-label="모바일 메뉴">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...stylex.props(styles.mobileLink)}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main {...stylex.props(styles.main)}>{children}</main>

      {footer && (
        <footer {...stylex.props(styles.footer)}>
          <div {...stylex.props(styles.footerInner)}>{footer}</div>
        </footer>
      )}
    </div>
  );
};
