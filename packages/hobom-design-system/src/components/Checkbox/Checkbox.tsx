import type { InputHTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";

type CheckboxSize = "small" | "medium";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Box size. Defaults to `"medium"`. */
  size?: CheckboxSize;
  /** Pull toward the start/end edge. */
  edge?: "start" | "end" | false;
  /** No-op kept for API compatibility (a native checkbox has no ripple). */
  disableRipple?: boolean;
}

const styles = stylex.create({
  root: {
    accentColor: "var(--hb-color-accent)",
    cursor: "pointer",
    margin: 0,
    flexShrink: 0,
  },
  small: { width: 16, height: 16 },
  medium: { width: 20, height: 20 },
  disabled: { cursor: "default" },
  edgeStart: { marginLeft: -2 },
  edgeEnd: { marginRight: -2 },
});

export const Checkbox = ({
  size = "medium",
  edge = false,
  disabled = false,
  disableRipple: _disableRipple,
  className,
  style,
  ...rest
}: CheckboxProps) => {
  const sx = stylex.props(
    styles.root,
    size === "small" ? styles.small : styles.medium,
    edge === "start" && styles.edgeStart,
    edge === "end" && styles.edgeEnd,
    disabled && styles.disabled,
  );

  return (
    <input
      type="checkbox"
      disabled={disabled}
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    />
  );
};
