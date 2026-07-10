import { ExpandLess, ExpandMore } from "../../icons";
import { Box } from "../../components/Box/Box";
import { Collapse } from "../../components/Collapse/Collapse";
import { List } from "../../components/List/List";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import { useToggleSet } from "./useToggleSet";
import type { AppShellNavItem } from "./nav-items.lib";

interface NavListProps {
  items: AppShellNavItem[];
  activeValue: string;
  collapsed: boolean;
  onNavigate: (path: string) => void;
  onPrefetch?: (path: string) => void;
}

export const NavList = ({ items, activeValue, collapsed, onNavigate, onPrefetch }: NavListProps) => {
  const [openGroups, toggleGroup] = useToggleSet(() => {
    const initial = new Set<string>();

    for (const item of items) {
      if (item.children?.some((child) => child.value === activeValue)) {
        initial.add(item.value);
      }
    }

    return initial;
  });

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

        // Collapsed: render children flat under the parent icon with tooltips.
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
