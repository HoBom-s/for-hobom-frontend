import type { InputHTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    borderWidth: 0,
    borderStyle: "none",
    outline: "none",
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
    color: "inherit",
    font: "inherit",
    appearance: "none",
    boxSizing: "border-box",
    width: "100%",
  },
  disabled: {
    cursor: "default",
  },
});

export type InputBaseProps = InputHTMLAttributes<HTMLInputElement>;

/** Unstyled input reset. Strips the browser's native chrome so callers can
 * layer their own styling on a bare, inheriting text field. */
export const InputBase = ({ className, style, disabled, ...rest }: InputBaseProps) => {
  const sx = stylex.props(styles.root, disabled && styles.disabled);

  return (
    <input
      disabled={disabled}
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    />
  );
};
