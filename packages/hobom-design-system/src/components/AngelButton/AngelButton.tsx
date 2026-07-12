import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

type AngelButtonVariant = "primary" | "outline" | "ghost" | "onDark";

type AngelButtonSize = "medium" | "small";

interface AngelButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: AngelButtonVariant;
  size?: AngelButtonSize;
  startIcon?: ReactNode;
  type?: "button" | "submit" | "reset";
}

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: 999,
    fontFamily: "inherit",
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: "nowrap",
    cursor: "pointer",
    appearance: "none",
    outline: {
      default: "none",
      ":focus-visible": "2px solid var(--hb-angel-green)",
    },
    outlineOffset: 2,
    transition: "background-color 0.15s, color 0.15s, border-color 0.15s, transform 0.05s",
    transform: { default: "none", ":active": "translateY(1px)" },
  },
  medium: { paddingBlock: 12, paddingInline: 22, fontSize: "0.9375rem" },
  small: { paddingBlock: 9, paddingInline: 18, fontSize: "0.875rem" },
  primary: {
    backgroundColor: { default: "var(--hb-angel-green)", ":hover": "var(--hb-angel-green-dark)" },
    color: "#ffffff",
  },
  outline: {
    backgroundColor: { default: "transparent", ":hover": "var(--hb-angel-green-tint)" },
    color: "var(--hb-angel-green-dark)",
    borderColor: "var(--hb-angel-green)",
  },
  ghost: {
    backgroundColor: {
      default: "var(--hb-angel-green-tint)",
      ":hover": "var(--hb-angel-green-tint-strong)",
    },
    color: "var(--hb-angel-green-dark)",
  },
  onDark: {
    backgroundColor: { default: "#ffffff", ":hover": "var(--hb-angel-green-tint)" },
    color: "var(--hb-angel-green-deep)",
  },
  icon: { display: "inline-flex", fontSize: "1.125rem" },
});

const VARIANT_STYLE = {
  primary: styles.primary,
  outline: styles.outline,
  ghost: styles.ghost,
  onDark: styles.onDark,
} as const;

/** Pill-shaped, brand-green button for the Angel consumer surface. */
export const AngelButton = ({
  variant = "primary",
  size = "medium",
  startIcon,
  type = "button",
  className,
  style,
  children,
  ...rest
}: AngelButtonProps) => {
  const sx = stylex.props(
    styles.root,
    size === "small" ? styles.small : styles.medium,
    VARIANT_STYLE[variant],
  );

  return (
    <button
      {...rest}
      type={type}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {startIcon && <span {...stylex.props(styles.icon)}>{startIcon}</span>}
      {children}
    </button>
  );
};
