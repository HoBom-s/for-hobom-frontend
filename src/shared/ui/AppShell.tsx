import { useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, MenuOutlined } from "@mui/icons-material";
import { Bom } from "@/packages/bom";
import {
  DRAWER_WIDTH,
  DRAWER_WIDTH_COLLAPSED,
  APPBAR_HEIGHT,
} from "@/shared/config";

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

/** children 포함 전체 아이템을 1차원 배열로 펼친다. */
const flattenNavItems = (items: AppShellNavItem[]): AppShellNavItem[] =>
  items.flatMap((item) =>
    item.children ? [item, ...item.children] : [item],
  );

interface Props {
  children: ReactNode;
  navItems: AppShellNavItem[];
  bottomNavItems?: AppShellNavItem[];
  appBarAction?: ReactNode;
  onPrefetch?: (path: string) => void;
}

const TRANSITION = "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)";

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
      if (
        item.children?.some((child) => child.value === activeValue)
      ) {
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
    <List disablePadding>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isGroupOpen = openGroups.has(item.value);
        const isActive = item.value === activeValue;
        const isChildActive = hasChildren && item.children!.some((c) => c.value === activeValue);

        const button = (
          <ListItemButton
            key={item.value}
            selected={!hasChildren && isActive}
            aria-current={!hasChildren && isActive ? "page" : undefined}
            onClick={() =>
              hasChildren
                ? toggleGroup(item.value)
                : onNavigate(item.path)
            }
            onMouseEnter={() => !hasChildren && onPrefetch?.(item.path)}
            sx={collapsed ? { justifyContent: "center", px: 1.5 } : undefined}
          >
            <ListItemIcon
              sx={
                collapsed
                  ? { minWidth: 0, justifyContent: "center" }
                  : undefined
              }
            >
              {item.icon}
            </ListItemIcon>
            {!collapsed && (
              <>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "0.875rem",
                        fontWeight: isActive || isChildActive ? 600 : 400,
                      },
                    },
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
          </ListItemButton>
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
              {item.children!.map((child) => {
                const childActive = child.value === activeValue;
                return (
                  <Tooltip
                    key={child.value}
                    title={child.label}
                    placement="right"
                    arrow
                  >
                    <ListItemButton
                      selected={childActive}
                      aria-current={childActive ? "page" : undefined}
                      onClick={() => onNavigate(child.path)}
                      onMouseEnter={() => onPrefetch?.(child.path)}
                      sx={{ justifyContent: "center", px: 1.5 }}
                    >
                      <ListItemIcon
                        sx={{ minWidth: 0, justifyContent: "center" }}
                      >
                        {child.icon}
                      </ListItemIcon>
                    </ListItemButton>
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
              <List disablePadding>
                {item.children!.map((child) => {
                  const childActive = child.value === activeValue;
                  return (
                    <ListItemButton
                      key={child.value}
                      selected={childActive}
                      aria-current={childActive ? "page" : undefined}
                      onClick={() => onNavigate(child.path)}
                      onMouseEnter={() => onPrefetch?.(child.path)}
                      sx={{ pl: 4.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={child.label}
                        slotProps={{
                          primary: {
                            sx: {
                              fontSize: "0.8125rem",
                              fontWeight: childActive ? 600 : 400,
                            },
                          },
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </Box>
        );
      })}
    </List>
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

  const currentWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED;

  const allItems = flattenNavItems([
    ...navItems,
    ...(bottomNavItems ?? []),
  ]);
  const activeItem = Bom.pipe(
    location.pathname,
    (currentPath) => {
      const sorted = [...allItems].sort(
        (a, b) => b.path.length - a.path.length,
      );
      return sorted.find((item) => currentPath.startsWith(item.path));
    },
    Bom.when(Bom.isNullish, () => navItems[0]),
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: APPBAR_HEIGHT,
            height: APPBAR_HEIGHT,
            px: 3,
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen((prev) => !prev)}
            size="small"
            edge="start"
            sx={{ color: "text.secondary" }}
          >
            <MenuOutlined fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            onClick={() => navigate("/")}
            sx={{
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "text.secondary",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            HoBom System
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ my: 1.5 }} />
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {activeItem.label}
          </Typography>

          {appBarAction && (
            <>
              <Box sx={{ flex: 1 }} />
              {appBarAction}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            width: currentWidth,
            transition: TRANSITION,
            overflowX: "hidden",
          },
        }}
      >
        {/* 로고 영역 */}
        <Box
          sx={{
            height: APPBAR_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: drawerOpen ? 2.5 : 0,
            flexShrink: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: "1.15rem",
              color: "#ffffff",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {drawerOpen ? "HoBom" : "H"}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <Box
          component="nav"
          aria-label="메인 네비게이션"
          sx={{ px: drawerOpen ? 1.5 : 0.75, py: 2, flexGrow: 1 }}
        >
          {drawerOpen && (
            <Typography
              variant="caption"
              sx={{
                px: 1,
                mb: 1,
                display: "block",
                color: "rgba(244,220,200,0.4)",
                fontSize: "0.7125rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              메뉴
            </Typography>
          )}
          <NavList
            items={navItems}
            activeValue={activeItem.value}
            collapsed={!drawerOpen}
            onNavigate={navigate}
            onPrefetch={onPrefetch}
          />
        </Box>

        {bottomNavItems && bottomNavItems.length > 0 && (
          <Box sx={{ px: drawerOpen ? 1.5 : 0.75, pb: 2 }}>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 1.5 }} />
            <NavList
              items={bottomNavItems}
              activeValue={activeItem.value}
              collapsed={!drawerOpen}
              onNavigate={navigate}
              onPrefetch={onPrefetch}
            />
          </Box>
        )}
      </Drawer>

      <Box
        component="main"
        sx={{
          position: "relative",
          flexGrow: 1,
          ml: `${currentWidth}px`,
          mt: `${APPBAR_HEIGHT}px`,
          height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
          overflow: "auto",
          bgcolor: "background.default",
          transition: `margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
