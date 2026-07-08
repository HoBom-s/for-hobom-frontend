import {
  createContext,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import * as stylex from "@stylexjs/stylex";

const DenseContext = createContext(false);

const styles = stylex.create({
  root: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: "relative",
  },
  rootPadding: { paddingBlock: 8 },
  item: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    boxSizing: "border-box",
    paddingBlock: 8,
    paddingInline: 16,
    width: "100%",
  },
  itemAlignStart: { alignItems: "flex-start" },
  itemNoGutters: { paddingInline: 0 },
  itemNoPadding: { padding: 0 },
  secondaryAction: {
    marginLeft: "auto",
    display: "inline-flex",
    alignItems: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    marginBottom: 4,
    paddingBlock: 10,
    paddingInline: 16,
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 8,
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(0, 0, 0, 0.04)",
    },
    color: "var(--hb-color-text-secondary)",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    textAlign: "left",
    cursor: "pointer",
    appearance: "none",
    outline: "none",
    transition: "background-color 0.15s",
  },
  buttonDense: { paddingBlock: 6 },
  buttonSelected: {
    backgroundColor: {
      default: "color-mix(in srgb, var(--hb-color-accent) 8%, transparent)",
      ":hover": "color-mix(in srgb, var(--hb-color-accent) 12%, transparent)",
    },
    color: "var(--hb-color-text-primary)",
  },
  buttonDisabled: { opacity: 0.5, pointerEvents: "none", cursor: "default" },
  text: { flex: 1, minWidth: 0 },
  primary: { fontSize: "1rem", lineHeight: 1.5, color: "var(--hb-color-text-primary)" },
  primaryDense: { fontSize: "0.875rem" },
  secondary: {
    fontSize: "0.875rem",
    lineHeight: 1.43,
    color: "var(--hb-color-text-secondary)",
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    minWidth: 36,
    color: "inherit",
    flexShrink: 0,
  },
  avatar: {
    display: "inline-flex",
    alignItems: "center",
    minWidth: 56,
    flexShrink: 0,
  },
  subheader: {
    display: "block",
    boxSizing: "border-box",
    margin: 0,
    paddingBlock: 8,
    paddingInline: 16,
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 2.5,
    color: "var(--hb-color-text-secondary)",
    backgroundColor: "var(--hb-color-surface)",
  },
  subheaderNoGutters: { paddingInline: 0 },
});

const cx = (a: string | undefined, b: string | undefined): string | undefined =>
  [a, b].filter(Boolean).join(" ") || undefined;

interface RootProps extends HTMLAttributes<HTMLUListElement> {
  dense?: boolean;
  disablePadding?: boolean;
  /** Rendered before the list items (e.g. a `List.Subheader`). */
  subheader?: ReactNode;
}

const Root = ({
  dense = false,
  disablePadding = false,
  subheader,
  className,
  style,
  children,
  ...rest
}: RootProps) => {
  const sx = stylex.props(styles.root, !disablePadding && styles.rootPadding);

  return (
    <DenseContext.Provider value={dense}>
      <ul {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
        {subheader}
        {children}
      </ul>
    </DenseContext.Provider>
  );
};

interface ItemProps extends LiHTMLAttributes<HTMLLIElement> {
  disablePadding?: boolean;
  disableGutters?: boolean;
  alignItems?: "center" | "flex-start";
  secondaryAction?: ReactNode;
}

const Item = ({
  disablePadding = false,
  disableGutters = false,
  alignItems = "center",
  secondaryAction,
  className,
  style,
  children,
  ...rest
}: ItemProps) => {
  const sx = stylex.props(
    styles.item,
    alignItems === "flex-start" && styles.itemAlignStart,
    disableGutters && styles.itemNoGutters,
    disablePadding && styles.itemNoPadding,
  );

  return (
    <li {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
      {children}
      {secondaryAction && <span {...stylex.props(styles.secondaryAction)}>{secondaryAction}</span>}
    </li>
  );
};

interface ItemButtonProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  disabled?: boolean;
  dense?: boolean;
}

const ItemButton = ({
  selected = false,
  disabled = false,
  dense,
  className,
  style,
  children,
  ...rest
}: ItemButtonProps) => {
  const denseCtx = useContext(DenseContext);
  const isDense = dense ?? denseCtx;
  const sx = stylex.props(
    styles.button,
    isDense && styles.buttonDense,
    selected && styles.buttonSelected,
    disabled && styles.buttonDisabled,
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      {...rest}
      className={cx(sx.className, className)}
      style={{ ...sx.style, ...style }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
    >
      {children}
    </div>
  );
};

interface ItemTextProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  primary?: ReactNode;
  secondary?: ReactNode;
  primaryStyle?: CSSProperties;
  secondaryStyle?: CSSProperties;
  children?: ReactNode;
}

const ItemText = ({
  primary,
  secondary,
  primaryStyle,
  secondaryStyle,
  className,
  style,
  children,
  ...rest
}: ItemTextProps) => {
  const dense = useContext(DenseContext);
  const sx = stylex.props(styles.text);
  const primarySx = stylex.props(styles.primary, dense && styles.primaryDense);
  const secondarySx = stylex.props(styles.secondary);

  return (
    <div {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
      <div className={primarySx.className} style={{ ...primarySx.style, ...primaryStyle }}>
        {primary ?? children}
      </div>
      {secondary != null && (
        <div className={secondarySx.className} style={{ ...secondarySx.style, ...secondaryStyle }}>
          {secondary}
        </div>
      )}
    </div>
  );
};

const ItemIcon = ({ className, style, children, ...rest }: HTMLAttributes<HTMLSpanElement>) => {
  const sx = stylex.props(styles.icon);

  return (
    <span {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
      {children}
    </span>
  );
};

const ItemAvatar = ({ className, style, children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const sx = stylex.props(styles.avatar);

  return (
    <div {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
      {children}
    </div>
  );
};

interface SubheaderProps extends HTMLAttributes<HTMLElement> {
  component?: "li" | "div";
  /** No-op kept for API compatibility. */
  disableSticky?: boolean;
  disableGutters?: boolean;
}

const Subheader = ({
  component: Component = "li",
  disableSticky: _disableSticky,
  disableGutters = false,
  className,
  style,
  children,
  ...rest
}: SubheaderProps) => {
  const sx = stylex.props(styles.subheader, disableGutters && styles.subheaderNoGutters);

  return (
    <Component {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
      {children}
    </Component>
  );
};

export const List = { Root, Item, ItemText, ItemIcon, ItemButton, ItemAvatar, Subheader };
