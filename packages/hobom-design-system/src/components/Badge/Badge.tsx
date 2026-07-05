import type { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

interface BadgeProps {
  /** Content of the badge bubble (a count or short text). Hidden when 0/empty. */
  badgeContent?: ReactNode;
  /** Bubble color. Defaults to `"primary"`. */
  color?: "primary" | "error";
  /** Cap a numeric count, e.g. `max={99}` shows `99+`. */
  max?: number;
  /** The element the badge is anchored to. */
  children: ReactNode;
}

const styles = stylex.create({
  root: {
    position: "relative",
    display: "inline-flex",
    verticalAlign: "middle",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: "translate(50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 16,
    minWidth: 16,
    paddingInline: 4,
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 1,
    color: "var(--hb-color-accent-contrast)",
    boxSizing: "border-box",
  },
  primary: { backgroundColor: "var(--hb-color-accent)" },
  error: { backgroundColor: "var(--hb-color-danger)" },
});

function display(content: ReactNode, max?: number): ReactNode {
  if (typeof content === "number" && max != null && content > max) return `${max}+`;

  return content;
}

export const Badge = ({ badgeContent, color = "primary", max, children }: BadgeProps) => {
  const show = badgeContent != null && badgeContent !== 0 && badgeContent !== false;

  return (
    <span {...stylex.props(styles.root)}>
      {children}
      {show && (
        <span {...stylex.props(styles.badge, color === "error" ? styles.error : styles.primary)}>
          {display(badgeContent, max)}
        </span>
      )}
    </span>
  );
};
