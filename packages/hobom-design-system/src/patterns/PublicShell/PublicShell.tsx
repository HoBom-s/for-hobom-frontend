import { useState, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

export interface PublicShellNavItem {
  label: string;
  href: string;
}

interface PublicShellProps {
  /** Brand lockup shown at the start of the bar. */
  brand?: ReactNode;
  /** Primary navigation links. */
  nav?: readonly PublicShellNavItem[];
  /** Trailing bar content, e.g. a login button. */
  actions?: ReactNode;
  /** Footer content; wrapped in the shell's footer container. */
  footer?: ReactNode;
  children: ReactNode;
}

const DESKTOP = "@media (min-width: 768px)";

const styles = stylex.create({
  shell: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "var(--hb-angel-surface)",
    color: "var(--hb-angel-ink)",
  },
  bar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    backgroundColor: "rgba(255, 255, 255, 0.86)",
    backdropFilter: "saturate(1.4) blur(10px)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-angel-line)",
  },
  barInner: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingInline: 20,
    height: 64,
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 700,
    fontSize: "1.125rem",
    letterSpacing: "-0.01em",
    color: "var(--hb-angel-green-deep)",
  },
  nav: {
    display: { default: "none", [DESKTOP]: "flex" },
    alignItems: "center",
    gap: 28,
    marginLeft: 8,
  },
  navLink: {
    fontSize: "0.9375rem",
    fontWeight: 500,
    color: { default: "var(--hb-angel-ink-soft)", ":hover": "var(--hb-angel-green-dark)" },
  },
  actions: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 },
  burger: {
    display: { default: "inline-flex", [DESKTOP]: "none" },
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: { default: "transparent", ":hover": "var(--hb-angel-green-tint)" },
    color: "var(--hb-angel-ink)",
    fontSize: "1.25rem",
    cursor: "pointer",
  },
  mobileNav: {
    display: { default: "flex", [DESKTOP]: "none" },
    flexDirection: "column",
    paddingInline: 20,
    paddingBottom: 12,
    gap: 2,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-angel-line)",
  },
  mobileLink: {
    paddingBlock: 12,
    fontSize: "0.9375rem",
    fontWeight: 500,
    color: "var(--hb-angel-ink)",
  },
  main: { flex: 1 },
  footer: {
    marginTop: 72,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-angel-line)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  footerInner: { maxWidth: 1120, marginInline: "auto", padding: 20 },
});

const DEFAULT_BRAND = (
  <>
    <span aria-hidden="true">🐾</span>
    HoBom Angel
  </>
);

/**
 * Mobile-first public chrome for the consumer surface: a sticky top bar with
 * brand + primary nav + trailing actions (with a mobile menu), plus a footer
 * slot. The desktop back-office `AppShell` (240px drawer) is unsuitable here.
 */
export const PublicShell = ({
  brand = DEFAULT_BRAND,
  nav = [],
  actions,
  footer,
  children,
}: PublicShellProps) => {
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
