import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonSize = "small" | "medium";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /** Show a spinner and disable the button. */
  loading?: boolean;
  /** No-op kept for API compatibility (in-house buttons carry no resting shadow). */
  disableElevation?: boolean;
  type?: "button" | "submit" | "reset";
}

const spin = stylex.keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

const styles = stylex.create({
  root: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    minWidth: 64,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: 8,
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: "none",
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    userSelect: "none",
    appearance: "none",
    outline: "none",
    transition: "background-color 0.2s, box-shadow 0.2s, border-color 0.2s",
  },
  focusRing: {
    outline: {
      default: "none",
      ":focus-visible": "2px solid var(--hb-color-accent)",
    },
    outlineOffset: 2,
  },
  disabled: {
    cursor: "default",
    pointerEvents: "none",
    opacity: 0.5,
    boxShadow: "none",
  },
  medium: { paddingBlock: 5, paddingInline: 15, fontSize: "0.875rem" },
  small: { paddingBlock: 3, paddingInline: 9, fontSize: "0.8125rem" },
  fullWidth: { width: "100%" },
  primary: {
    backgroundColor: { default: "var(--hb-color-accent)", ":hover": "var(--hb-color-accent-dark)" },
    color: "var(--hb-color-accent-contrast)",
    boxShadow: { default: "none", ":hover": "0 4px 12px rgba(70, 128, 255, 0.35)" },
  },
  danger: {
    backgroundColor: {
      default: "var(--hb-color-danger)",
      ":hover": "color-mix(in srgb, var(--hb-color-danger) 88%, black)",
    },
    color: "var(--hb-color-accent-contrast)",
    boxShadow: { default: "none", ":hover": "0 4px 12px rgba(70, 128, 255, 0.35)" },
  },
  secondary: {
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in srgb, var(--hb-color-accent) 6%, transparent)",
    },
    color: "var(--hb-color-accent)",
    borderColor: "var(--hb-color-accent)",
  },
  ghost: {
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in srgb, currentColor 8%, transparent)",
    },
    color: "inherit",
  },
  // `disableElevation` drops the primary/danger hover glow.
  flat: { boxShadow: "none" },
  startIcon: { display: "inline-flex", marginRight: 8, marginLeft: -4, fontSize: "1.125rem" },
  endIcon: { display: "inline-flex", marginLeft: 8, marginRight: -4, fontSize: "1.125rem" },
  // `opacity` (not `visibility`) keeps the label in the accessibility tree so a
  // loading button still has a discernible name, while the spinner covers it.
  hiddenLabel: { opacity: 0 },
  spinner: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: "50%",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "currentColor",
    borderTopColor: "transparent",
    animationName: spin,
    animationDuration: "0.7s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
});

const VARIANT_STYLE = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  ghost: styles.ghost,
} as const;

const ButtonBase = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  loading = false,
  disableElevation = false,
  disabled = false,
  type = "button",
  className,
  style,
  children,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const sx = stylex.props(
    styles.root,
    styles.focusRing,
    size === "small" ? styles.small : styles.medium,
    VARIANT_STYLE[variant],
    fullWidth && styles.fullWidth,
    disableElevation && styles.flat,
    isDisabled && styles.disabled,
  );

  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {loading && <span {...stylex.props(styles.spinner)} aria-hidden="true" />}
      {startIcon && (
        <span {...stylex.props(styles.startIcon, loading && styles.hiddenLabel)}>{startIcon}</span>
      )}
      <span {...stylex.props(loading && styles.hiddenLabel)}>{children}</span>
      {endIcon && (
        <span {...stylex.props(styles.endIcon, loading && styles.hiddenLabel)}>{endIcon}</span>
      )}
    </button>
  );
};

type IconVariant = "default" | "danger";

type IconSize = "small" | "medium";

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: IconVariant;
  size?: IconSize;
  type?: "button" | "submit" | "reset";
  /** Pull the button toward the start/end edge, cancelling its padding. */
  edge?: "start" | "end" | false;
  children?: ReactNode;
}

const iconStyles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    // Longhand (not the `border` shorthand) so StyleX reliably strips the
    // browser's default <button> border — the shorthand left a stray border.
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: "50%",
    // Focus shows as a slightly stronger background tint (no outline ring), the
    // way MUI's IconButton does — an accent outline reads as an odd border when
    // focus returns to the button after a menu/popover closes.
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in srgb, currentColor 8%, transparent)",
      ":focus-visible": "color-mix(in srgb, currentColor 14%, transparent)",
    },
    cursor: "pointer",
    appearance: "none",
    outline: "none",
    transition: "background-color 0.2s",
  },
  medium: { padding: 8, fontSize: "1.5rem" },
  small: { padding: 5, fontSize: "1.25rem" },
  default: { color: "var(--hb-color-text-secondary)" },
  danger: { color: "var(--hb-color-danger)" },
  disabled: { cursor: "default", pointerEvents: "none", opacity: 0.4 },
  edgeStart: { marginLeft: -8 },
  edgeEnd: { marginRight: -8 },
});

const Icon = ({
  variant = "default",
  size = "medium",
  edge = false,
  disabled = false,
  type = "button",
  className,
  style,
  children,
  ...rest
}: IconButtonProps) => {
  const sx = stylex.props(
    iconStyles.root,
    size === "small" ? iconStyles.small : iconStyles.medium,
    variant === "danger" ? iconStyles.danger : iconStyles.default,
    edge === "start" && iconStyles.edgeStart,
    edge === "end" && iconStyles.edgeEnd,
    disabled && iconStyles.disabled,
  );

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </button>
  );
};

export const Button = Object.assign(ButtonBase, { Icon });
