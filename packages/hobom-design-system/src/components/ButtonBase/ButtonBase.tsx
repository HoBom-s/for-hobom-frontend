import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    borderWidth: 0,
    borderStyle: "none",
    margin: 0,
    padding: 0,
    color: "inherit",
    font: "inherit",
    textAlign: "inherit",
    cursor: "pointer",
    appearance: "none",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: {
      default: "transparent",
      ":focus-visible": "rgba(70, 128, 255, 0.08)",
    },
    outlineWidth: { default: 0, ":focus-visible": 2 },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineColor: { default: "transparent", ":focus-visible": "var(--hb-color-accent)" },
    outlineOffset: { default: 0, ":focus-visible": 2 },
  },
  disabled: {
    cursor: "default",
  },
});

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const ButtonBase = ({
  onClick,
  children,
  disabled,
  className,
  style,
  type = "button",
  ...rest
}: ButtonBaseProps) => {
  const sx = stylex.props(styles.root, disabled && styles.disabled);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
};
