import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import * as stylex from "@stylexjs/stylex";
import { Popover } from "../Popover/Popover";
import type { PopoverOrigin } from "../Popover/popover-position.lib";

interface MenuContextValue {
  onClose?: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

const enabledItems = (list: HTMLUListElement | null): HTMLElement[] =>
  list
    ? Array.from(
        list.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'),
      )
    : [];

const styles = stylex.create({
  list: {
    listStyle: "none",
    margin: 0,
    padding: "4px 0",
    minWidth: 112,
    outline: "none",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingBlock: 8,
    paddingInline: 16,
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(0, 0, 0, 0.04)",
      ":focus-visible": "rgba(0, 0, 0, 0.04)",
    },
    outline: "none",
  },
  selected: {
    backgroundColor: "color-mix(in srgb, var(--hb-color-accent) 8%, transparent)",
  },
  disabled: {
    color: "var(--hb-color-text-disabled)",
    cursor: "default",
    pointerEvents: "none",
  },
});

interface RootProps extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
  open: boolean;
  anchorEl: HTMLElement | null | undefined;
  onClose?: () => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  children?: ReactNode;
}

const Root = ({
  open,
  anchorEl,
  onClose,
  anchorOrigin,
  transformOrigin,
  className,
  style,
  children,
  ...rest
}: RootProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  // Move focus to the first item once the menu is open (after the popover has
  // mounted and focused its paper).
  useEffect(() => {
    if (!open) return;

    enabledItems(listRef.current)[0]?.focus();
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const items = enabledItems(listRef.current);

    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        items[(current + 1) % items.length]?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        items[(current - 1 + items.length) % items.length]?.focus();
        break;
      case "Home":
        event.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
    }
  };

  return (
    <MenuContext.Provider value={{ onClose }}>
      <Popover
        open={open}
        anchorEl={anchorEl ?? null}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        className={className}
        style={style}
      >
        <ul ref={listRef} role="menu" onKeyDown={onKeyDown} {...rest} {...stylex.props(styles.list)}>
          {children}
        </ul>
      </Popover>
    </MenuContext.Provider>
  );
};

interface ItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "onClick"> {
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  disabled?: boolean;
  selected?: boolean;
  children?: ReactNode;
}

const Item = ({
  onClick,
  disabled = false,
  selected = false,
  className,
  style,
  children,
  ...rest
}: ItemProps) => {
  const ctx = useContext(MenuContext);

  const sx = stylex.props(styles.item, selected && styles.selected, disabled && styles.disabled);

  return (
    <li
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
      onClick={(event) => {
        if (disabled) return;
        onClick?.(event);
        ctx?.onClose?.();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          // Fire a real click so the onClick handler runs with a MouseEvent.
          event.currentTarget.click();
        }
      }}
    >
      {children}
    </li>
  );
};

export const Menu = { Root, Item };
