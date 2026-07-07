import type { HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

type CardVariant = "outlined" | "elevation";

const styles = stylex.create({
  root: {
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    borderRadius: 8,
    overflow: "hidden",
    boxSizing: "border-box",
  },
  outlined: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
  },
  elevation: { boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.03)" },
  content: {
    padding: 16,
    ":last-child": { paddingBottom: 24 },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
  clickable: {
    display: "block",
    width: "100%",
    padding: 0,
    // Longhand so StyleX reliably strips the browser's default <button> border
    // (the shorthand `border: "none"` can leave a stray inner border).
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in srgb, currentColor 4%, transparent)",
    },
    textAlign: "inherit",
    font: "inherit",
    color: "inherit",
    cursor: "pointer",
    appearance: "none",
  },
});

interface CardRootProps extends HTMLAttributes<HTMLDivElement> {
  /** `"outlined"` (border) or `"elevation"` (shadow). Defaults to `"outlined"`. */
  variant?: CardVariant;
}

const Root = ({ variant = "outlined", className, style, children, ...rest }: CardRootProps) => {
  const sx = stylex.props(styles.root, variant === "elevation" ? styles.elevation : styles.outlined);

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </div>
  );
};

const Content = ({ className, style, children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const sx = stylex.props(styles.content);

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </div>
  );
};

const Actions = ({ className, style, children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const sx = stylex.props(styles.actions);

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </div>
  );
};

interface ClickableProps extends Omit<CardRootProps, "onClick"> {
  onClick: () => void;
  children: ReactNode;
}

// A card whose whole surface is a button, with a subtle hover overlay.
const Clickable = ({ onClick, variant = "outlined", children, ...rest }: ClickableProps) => {
  const button = stylex.props(styles.clickable);

  return (
    <Root variant={variant} {...rest}>
      <button type="button" onClick={onClick} className={button.className} style={button.style}>
        {children}
      </button>
    </Root>
  );
};

export const Card = { Root, Content, Actions, Clickable };
