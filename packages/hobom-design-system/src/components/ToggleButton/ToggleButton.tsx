import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  reset: {
    // Reset the UA button border with longhands before applying our own border.
    borderWidth: 0,
    borderStyle: "none",
  },
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: "var(--hb-radius-control, 8px)",
    backgroundColor: {
      default: "transparent",
      ":focus-visible": "color-mix(in srgb, var(--hb-color-accent) 8%, transparent)",
    },
    color: "var(--hb-color-text-secondary)",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    cursor: "pointer",
    appearance: "none",
    outline: "none",
  },
  medium: {
    paddingBlock: 6,
    paddingInline: 12,
    fontSize: "0.875rem",
  },
  small: {
    paddingBlock: 4,
    paddingInline: 8,
    fontSize: "0.8125rem",
  },
  selected: {
    color: "var(--hb-color-accent)",
    borderColor: "var(--hb-color-accent)",
    backgroundColor: "color-mix(in srgb, var(--hb-color-accent) 8%, transparent)",
  },
  // "segmented": a borderless pill meant to sit inside a ToggleButtonGroup
  // track. Selected paints a raised white pill over the recessed track.
  segmented: {
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 9,
    color: "var(--hb-color-text-secondary)",
    fontWeight: 600,
  },
  segmentedSelected: {
    color: "var(--hb-color-text-primary)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "0 2px 6px -3px rgba(30,45,55,0.4)",
  },
});

type ToggleButtonVariant = "outlined" | "segmented";

interface ToggleButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  value: string;
  selected?: boolean;
  onChange?: (event: MouseEvent<HTMLButtonElement>, value: string) => void;
  size?: "small" | "medium";
  variant?: ToggleButtonVariant;
  children?: ReactNode;
}

export const ToggleButton = ({
  value,
  selected = false,
  onChange,
  size = "medium",
  variant = "outlined",
  className,
  style,
  children,
  ...rest
}: ToggleButtonProps) => {
  const segmented = variant === "segmented";

  const sx = stylex.props(
    styles.reset,
    styles.root,
    size === "small" ? styles.small : styles.medium,
    segmented && styles.segmented,
    selected && (segmented ? styles.segmentedSelected : styles.selected),
  );

  return (
    <button
      type="button"
      aria-pressed={selected}
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
      onClick={(event) => onChange?.(event, value)}
    >
      {children}
    </button>
  );
};
