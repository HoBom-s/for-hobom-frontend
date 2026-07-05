import type { CSSProperties } from "react";
import * as stylex from "@stylexjs/stylex";

interface DividerProps {
  /** Line direction. Defaults to `"horizontal"`. */
  orientation?: "horizontal" | "vertical";
  /** For a vertical divider inside a flex row, stretch to the row's height. */
  flexItem?: boolean;
  className?: string;
  style?: CSSProperties;
}

const styles = stylex.create({
  base: {
    border: "none",
    backgroundColor: "var(--hb-color-border)",
    flexShrink: 0,
  },
  horizontal: { width: "100%", height: 1 },
  vertical: { width: 1, height: "100%" },
  flexItem: { alignSelf: "stretch", height: "auto" },
});

export const Divider = ({
  orientation = "horizontal",
  flexItem = false,
  className,
  style,
}: DividerProps) => {
  const isVertical = orientation === "vertical";
  const sx = stylex.props(
    styles.base,
    isVertical ? styles.vertical : styles.horizontal,
    flexItem && styles.flexItem,
  );

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={[sx.className, className].filter(Boolean).join(" ")}
      style={{ ...sx.style, ...style }}
    />
  );
};
