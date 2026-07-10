import { useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Box } from "../../components/Box/Box";
import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED, APPBAR_HEIGHT } from "../../foundations/layout";
import { AppBar } from "./AppBar";
import { Sidebar } from "./Sidebar";
import { resolveActiveItem, type AppShellNavItem, type NavEntry } from "./nav-items.lib";

interface AppShellProps {
  children: ReactNode;
  navItems: NavEntry[];
  bottomNavItems?: AppShellNavItem[];
  appBarAction?: ReactNode;
  onPrefetch?: (path: string) => void;
}

const styles = stylex.create({
  skipLink: {
    position: "fixed",
    top: { default: -100, ":focus": 8 },
    left: 8,
    zIndex: 1600,
    backgroundColor: "var(--hb-color-accent)",
    color: "#fff",
    paddingBlock: 8,
    paddingInline: 16,
    borderRadius: 8,
    fontSize: "0.875rem",
    fontWeight: 600,
    textDecoration: "none",
  },
});

/**
 * 데스크톱 레이아웃 쉘. AppBar(56px) + Sidebar(240px/64px) + main 콘텐츠로 구성.
 * 현재 경로와 가장 긴 prefix 매칭되는 navItem이 활성 상태로 표시된다.
 */
export const AppShell = ({
  children,
  navItems,
  bottomNavItems,
  appBarAction,
  onPrefetch,
}: AppShellProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const activeItem = resolveActiveItem(navItems, bottomNavItems, location.pathname);
  const currentWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "var(--hb-color-canvas)",
      }}
    >
      <a href="#main-content" {...stylex.props(styles.skipLink)}>
        본문으로 건너뛰기
      </a>

      <AppBar
        drawerOpen={drawerOpen}
        onToggleDrawer={() => setDrawerOpen((prev) => !prev)}
        activeLabel={activeItem?.label ?? ""}
        action={appBarAction}
      />

      <Sidebar
        navItems={navItems}
        bottomNavItems={bottomNavItems}
        drawerOpen={drawerOpen}
        activeValue={activeItem?.value ?? ""}
        onNavigate={navigate}
        onPrefetch={onPrefetch}
      />

      <Box
        component="main"
        id="main-content"
        style={{
          position: "relative",
          flexGrow: 1,
          marginLeft: currentWidth,
          marginTop: APPBAR_HEIGHT,
          height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
          overflow: "auto",
          backgroundColor: "var(--hb-color-surface)",
          transition: "margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </Box>
    </div>
  );
};
