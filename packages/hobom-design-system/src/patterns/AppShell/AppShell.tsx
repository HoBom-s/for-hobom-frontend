import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Bom } from "hobom-utils";
import { ExpandLess, ExpandMore, MenuOutlined } from "../../icons";
import { Box } from "../../components/Box/Box";
import { Button } from "../../components/Button/Button";
import { Collapse } from "../../components/Collapse/Collapse";
import { Divider } from "../../components/Divider/Divider";
import { List } from "../../components/List/List";
import { Text } from "../../components/Text/Text";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED, APPBAR_HEIGHT } from "../../foundations/layout";

export interface AppShellNavItem {
  /** 네비게이션 아이템의 고유 식별자. 활성 상태 판별에 사용. */
  value: string;
  /** 사이드바에 표시할 텍스트. 접힘 모드에서는 Tooltip으로 표시. */
  label: string;
  /** 클릭 시 이동할 경로. `location.pathname.startsWith(path)`로 활성 상태 판별. */
  path: string;
  icon: ReactNode;
  /** 접이식 서브 메뉴 아이템. 부모 아이템 클릭 시 토글. */
  children?: AppShellNavItem[];
}

/** 섹션 헤더로 그룹화된 네비게이션 아이템 모음. */
export interface AppShellNavSection {
  /** 섹션 고유 키. */
  section: string;
  /** 사이드바에 표시할 섹션 헤더 텍스트. */
  label: string;
  /** 이 섹션에 속하는 아이템 목록. */
  items: AppShellNavItem[];
}

/** 독립 아이템 또는 섹션. navItems prop의 엘리먼트 타입. */
export type NavEntry = AppShellNavItem | AppShellNavSection;

const isSection = (entry: NavEntry): entry is AppShellNavSection => "items" in entry;

/** children 포함 전체 아이템을 1차원 배열로 펼친다. */
const flattenNavItems = (items: AppShellNavItem[]): AppShellNavItem[] =>
  items.flatMap((item) => (item.children ? [item, ...item.children] : [item]));

/** NavEntry[]에서 모든 AppShellNavItem을 1차원 배열로 추출한다. */
const flattenNavEntries = (entries: NavEntry[]): AppShellNavItem[] =>
  entries.flatMap((entry) =>
    isSection(entry) ? flattenNavItems(entry.items) : flattenNavItems([entry]),
  );

interface Props {
  children: ReactNode;
  navItems: NavEntry[];
  bottomNavItems?: AppShellNavItem[];
  appBarAction?: ReactNode;
  onPrefetch?: (path: string) => void;
}

const TRANSITION = "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)";

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
  brand: {
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: { default: "var(--hb-color-text-secondary)", ":hover": "var(--hb-color-accent)" },
    cursor: "pointer",
  },
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

const NavList = ({
  items,
  activeValue,
  collapsed,
  onNavigate,
  onPrefetch,
}: {
  items: AppShellNavItem[];
  activeValue: string;
  collapsed: boolean;
  onNavigate: (path: string) => void;
  onPrefetch?: (path: string) => void;
}) => {
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const initial = new Set<string>();

    for (const item of items) {
      if (item.children?.some((child) => child.value === activeValue)) {
        initial.add(item.value);
      }
    }

    return initial;
  });

  const toggleGroup = (value: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);

      if (next.has(value)) next.delete(value);
      else next.add(value);

      return next;
    });
  };

  return (
    <List.Root disablePadding>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isGroupOpen = openGroups.has(item.value);
        const isActive = item.value === activeValue;
        const isChildActive = item.children?.some((c) => c.value === activeValue) ?? false;

        const button = (
          <List.ItemButton
            key={item.value}
            selected={!hasChildren && isActive}
            aria-current={!hasChildren && isActive ? "page" : undefined}
            onClick={() => (hasChildren ? toggleGroup(item.value) : onNavigate(item.path))}
            onMouseEnter={() => !hasChildren && onPrefetch?.(item.path)}
            style={collapsed ? { justifyContent: "center", paddingInline: 12 } : undefined}
          >
            <List.ItemIcon style={collapsed ? { minWidth: 0, justifyContent: "center" } : undefined}>
              {item.icon}
            </List.ItemIcon>
            {!collapsed && (
              <>
                <List.ItemText
                  primary={item.label}
                  primaryStyle={{
                    fontSize: "0.875rem",
                    fontWeight: isActive || isChildActive ? 600 : 400,
                  }}
                />
                {hasChildren &&
                  (isGroupOpen ? (
                    <ExpandLess sx={{ fontSize: 18, opacity: 0.5 }} />
                  ) : (
                    <ExpandMore sx={{ fontSize: 18, opacity: 0.5 }} />
                  ))}
              </>
            )}
          </List.ItemButton>
        );

        const wrappedButton = collapsed ? (
          <Tooltip key={item.value} title={item.label} placement="right" arrow>
            {button}
          </Tooltip>
        ) : (
          button
        );

        if (!hasChildren) return wrappedButton;

        // 접힘 모드: children을 부모 아이콘 Tooltip에 flat 렌더링
        if (collapsed) {
          return (
            <Box key={item.value}>
              {wrappedButton}
              {item.children?.map((child) => {
                const childActive = child.value === activeValue;

                return (
                  <Tooltip key={child.value} title={child.label} placement="right" arrow>
                    <List.ItemButton
                      selected={childActive}
                      aria-current={childActive ? "page" : undefined}
                      onClick={() => onNavigate(child.path)}
                      onMouseEnter={() => onPrefetch?.(child.path)}
                      style={{ justifyContent: "center", paddingInline: 12 }}
                    >
                      <List.ItemIcon style={{ minWidth: 0, justifyContent: "center" }}>
                        {child.icon}
                      </List.ItemIcon>
                    </List.ItemButton>
                  </Tooltip>
                );
              })}
            </Box>
          );
        }

        return (
          <Box key={item.value}>
            {wrappedButton}
            <Collapse in={isGroupOpen} unmountOnExit>
              <List.Root disablePadding>
                {item.children?.map((child) => {
                  const childActive = child.value === activeValue;

                  return (
                    <List.ItemButton
                      key={child.value}
                      selected={childActive}
                      aria-current={childActive ? "page" : undefined}
                      onClick={() => onNavigate(child.path)}
                      onMouseEnter={() => onPrefetch?.(child.path)}
                      style={{ paddingLeft: 36 }}
                    >
                      <List.ItemIcon style={{ minWidth: 28 }}>{child.icon}</List.ItemIcon>
                      <List.ItemText
                        primary={child.label}
                        primaryStyle={{
                          fontSize: "0.8125rem",
                          fontWeight: childActive ? 600 : 400,
                        }}
                      />
                    </List.ItemButton>
                  );
                })}
              </List.Root>
            </Collapse>
          </Box>
        );
      })}
    </List.Root>
  );
};

/**
 * 데스크톱 레이아웃 쉘. AppBar(56px) + Drawer(240px/64px) + main 콘텐츠로 구성.
 * 현재 경로와 가장 긴 prefix 매칭되는 navItem이 활성 상태로 표시된다.
 */
export const AppShell = ({
  children,
  navItems,
  bottomNavItems,
  appBarAction,
  onPrefetch,
}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  // 현재 활성 아이템이 속한 섹션을 자동 펼침
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();

    for (const entry of navItems) {
      if (isSection(entry)) {
        initial.add(entry.section);
      }
    }

    return initial;
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);

      if (next.has(section)) next.delete(section);
      else next.add(section);

      return next;
    });
  };

  const currentWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED;

  const allItems = [...flattenNavEntries(navItems), ...flattenNavItems(bottomNavItems ?? [])];
  const firstItem = (() => {
    const first = navItems[0];

    return first && isSection(first) ? first.items[0] : first;
  })();
  const activeItem = Bom.pipe(
    location.pathname,
    (currentPath) => {
      const sorted = [...allItems].sort((a, b) => b.path.length - a.path.length);

      return sorted.find((item) => currentPath.startsWith(item.path));
    },
    Bom.when(Bom.isNullish, () => firstItem),
  );

  const navPadding: CSSProperties = { paddingInline: drawerOpen ? 12 : 6 };

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

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: APPBAR_HEIGHT,
          zIndex: 1301,
          backgroundColor: "var(--hb-color-chrome)",
          color: "var(--hb-color-text-primary)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            paddingInline: 24,
            gap: 16,
          }}
        >
          <Button.Icon
            aria-label="사이드바 토글"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((prev) => !prev)}
            size="small"
            edge="start"
            style={{ color: "var(--hb-color-text-secondary)" }}
          >
            <MenuOutlined sx={{ fontSize: 20 }} />
          </Button.Icon>
          <span onClick={() => navigate("/")} {...stylex.props(styles.brand)}>
            HoBom System
          </span>
          <Divider orientation="vertical" flexItem style={{ marginBlock: 12 }} />
          <Text variant="body1" style={{ fontWeight: 600, color: "var(--hb-color-text-primary)" }}>
            {activeItem.label}
          </Text>

          {appBarAction && (
            <>
              <Box style={{ flex: 1 }} />
              {appBarAction}
            </>
          )}
        </div>
      </header>

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
                      activeValue={activeItem.value}
                      collapsed={!drawerOpen}
                      onNavigate={navigate}
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
                activeValue={activeItem.value}
                collapsed={!drawerOpen}
                onNavigate={navigate}
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
              activeValue={activeItem.value}
              collapsed={!drawerOpen}
              onNavigate={navigate}
              onPrefetch={onPrefetch}
            />
          </Box>
        )}
      </aside>

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
