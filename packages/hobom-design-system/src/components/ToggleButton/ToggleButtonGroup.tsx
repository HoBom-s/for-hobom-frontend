import type { HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
  },
  outlined: {
    gap: 8,
  },
  // Recessed track that holds `variant="segmented"` ToggleButtons; the selected
  // one raises a white pill above it.
  segmented: {
    gap: 0,
    padding: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 12,
    backgroundColor: "var(--hb-color-canvas)",
  },
});

interface ToggleButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "outlined" | "segmented";
  children?: ReactNode;
}

/** Groups related ToggleButtons. `variant="segmented"` renders the track that
 *  the segmented ToggleButton pills sit inside. */
export const ToggleButtonGroup = ({
  variant = "outlined",
  className,
  style,
  children,
  ...rest
}: ToggleButtonGroupProps) => {
  const sx = stylex.props(styles.root, variant === "segmented" ? styles.segmented : styles.outlined);

  return (
    <div
      role="group"
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </div>
  );
};
