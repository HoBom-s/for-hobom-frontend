import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import * as stylex from "@stylexjs/stylex";

type TabValue = string | number;

interface TabsContextValue {
  value: TabValue;
  onChange: (event: SyntheticEvent, value: TabValue) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 48,
    paddingBlock: 6,
    paddingInline: 16,
    marginBottom: -1,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderStyle: "none",
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    backgroundColor: "transparent",
    color: { default: "var(--hb-color-text-secondary)", ":hover": "var(--hb-color-text-primary)" },
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    appearance: "none",
    outline: "none",
  },
  active: {
    color: "var(--hb-color-accent)",
    borderBottomColor: "var(--hb-color-accent)",
  },
  disabled: { cursor: "default", pointerEvents: "none", opacity: 0.5 },
  icon: { display: "inline-flex", fontSize: "1.25rem" },
});

interface RootProps<T extends TabValue = TabValue>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: T;
  onChange: (event: SyntheticEvent, value: T) => void;
  children?: ReactNode;
}

const Root = <T extends TabValue>({
  value,
  onChange,
  className,
  style,
  children,
  ...rest
}: RootProps<T>) => {
  const sx = stylex.props(styles.root);
  // Give each Item its positional index so items without an explicit `value`
  // fall back to it (matching MUI's index-based tab values).
  let index = 0;
  const items = Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child as ReactElement<ItemProps>, { index: index++ }) : child,
  );

  return (
    <TabsContext.Provider value={{ value, onChange: onChange as TabsContextValue["onChange"] }}>
      <div
        role="tablist"
        {...rest}
        className={[sx.className, className].filter(Boolean).join(" ") || undefined}
        style={{ ...sx.style, ...style }}
      >
        {items}
      </div>
    </TabsContext.Provider>
  );
};

interface ItemProps extends Omit<HTMLAttributes<HTMLButtonElement>, "onChange"> {
  value?: TabValue;
  label?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  disabled?: boolean;
  /** Injected by `Tabs.Root`; the positional fallback value. */
  index?: number;
}

const Item = ({
  value,
  label,
  icon,
  iconPosition = "start",
  disabled = false,
  index = 0,
  className,
  style,
  ...rest
}: ItemProps) => {
  const ctx = useContext(TabsContext);
  const tabValue = value ?? index;
  const active = ctx?.value === tabValue;
  const sx = stylex.props(styles.item, active && styles.active, disabled && styles.disabled);
  const iconEl = icon ? <span {...stylex.props(styles.icon)}>{icon}</span> : null;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
      onClick={(event) => ctx?.onChange(event, tabValue)}
    >
      {iconPosition === "start" && iconEl}
      {label}
      {iconPosition === "end" && iconEl}
    </button>
  );
};

export const Tabs = { Root, Item };
