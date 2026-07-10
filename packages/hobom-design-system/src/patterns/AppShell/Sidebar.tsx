import type { CSSProperties, KeyboardEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { ExpandLess, ExpandMore } from "../../icons";
import { Box } from "../../components/Box/Box";
import { Collapse } from "../../components/Collapse/Collapse";
import { Divider } from "../../components/Divider/Divider";
import { Text } from "../../components/Text/Text";
import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED, APPBAR_HEIGHT } from "../../foundations/layout";
import { NavList } from "./NavList";
import { useToggleSet } from "./useToggleSet";
import { isSection, type AppShellNavItem, type NavEntry } from "./nav-items.lib";

interface SidebarProps {
  navItems: NavEntry[];
  bottomNavItems?: AppShellNavItem[];
  drawerOpen: boolean;
  activeValue: string;
  onNavigate: (path: string) => void;
  onPrefetch?: (path: string) => void;
}

const TRANSITION = "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)";

const styles = stylex.create({
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 8,
    marginBottom: 4,
    cursor: "pointer",
    borderRadius: 8,
    backgroundColor: { default: "transparent", ":hover": "rgba(0, 0, 0, 0.04)" },
  },
});

export const Sidebar = ({
  navItems,
  bottomNavItems,
  drawerOpen,
  activeValue,
  onNavigate,
  onPrefetch,
}: SidebarProps) => {
  const [openSections, toggleSection] = useToggleSet(() => {
    const initial = new Set<string>();

    for (const entry of navItems) {
      if (isSection(entry)) {
        initial.add(entry.section);
      }
    }

    return initial;
  });

  const currentWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED;
  const navPadding: CSSProperties = { paddingInline: drawerOpen ? 12 : 6 };

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: currentWidth,
        zIndex: 1200,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        backgroundColor: "var(--hb-color-chrome)",
        borderRight: "1px solid var(--hb-color-border)",
        transition: TRANSITION,
      }}
    >
      {/* 로고 영역 */}
      <Box
        style={{
          height: APPBAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingInline: drawerOpen ? 20 : 0,
          flexShrink: 0,
        }}
      >
        <Text
          variant="h6"
          style={{
            fontWeight: 800,
            fontSize: "1.15rem",
            color: "var(--hb-color-text-primary)",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {drawerOpen ? "HoBom" : "H"}
        </Text>
      </Box>

      <Divider />

      <Box
        component="nav"
        aria-label="메인 네비게이션"
        style={{ ...navPadding, paddingBlock: 16, flexGrow: 1 }}
      >
        {navItems.map((entry, index) => {
          if (isSection(entry)) {
            const isSectionOpen = openSections.has(entry.section);

            return (
              <Box key={entry.section}>
                {drawerOpen ? (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSectionOpen}
                    onClick={() => toggleSection(entry.section)}
                    onKeyDown={(e: KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSection(entry.section);
                      }
                    }}
                    {...stylex.props(styles.sectionHeader)}
                    style={{ marginTop: index > 0 ? 16 : 0 }}
                  >
                    <Text
                      variant="caption"
                      style={{
                        color: "var(--hb-color-text-secondary)",
                        fontSize: "0.7125rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        userSelect: "none",
                      }}
                    >
                      {entry.label}
                    </Text>
                    {isSectionOpen ? (
                      <ExpandLess sx={{ fontSize: 14, color: "var(--hb-color-text-disabled)" }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: 14, color: "var(--hb-color-text-disabled)" }} />
                    )}
                  </div>
                ) : (
                  index > 0 && <Divider style={{ marginBlock: 8 }} />
                )}
                <Collapse in={!drawerOpen || isSectionOpen} unmountOnExit>
                  <NavList
                    items={entry.items}
                    activeValue={activeValue}
                    collapsed={!drawerOpen}
                    onNavigate={onNavigate}
                    onPrefetch={onPrefetch}
                  />
                </Collapse>
              </Box>
            );
          }

          return (
            <NavList
              key={entry.value}
              items={[entry]}
              activeValue={activeValue}
              collapsed={!drawerOpen}
              onNavigate={onNavigate}
              onPrefetch={onPrefetch}
            />
          );
        })}
      </Box>

      {bottomNavItems && bottomNavItems.length > 0 && (
        <Box style={{ ...navPadding, paddingBottom: 16 }}>
          <Divider style={{ marginBottom: 12 }} />
          <NavList
            items={bottomNavItems}
            activeValue={activeValue}
            collapsed={!drawerOpen}
            onNavigate={onNavigate}
            onPrefetch={onPrefetch}
          />
        </Box>
      )}
    </aside>
  );
};
