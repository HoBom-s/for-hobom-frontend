import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

type SkeletonVariant = "text" | "circular" | "rectangular";

interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  /** `"pulse"` (default) or `false` to disable. `"wave"` falls back to pulse. */
  animation?: "pulse" | "wave" | false;
  children?: ReactNode;
}

const pulse = stylex.keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.4 },
  "100%": { opacity: 1 },
});

const REDUCE = "@media (prefers-reduced-motion: reduce)";

const styles = stylex.create({
  root: {
    display: "block",
    boxSizing: "border-box",
    backgroundColor: "color-mix(in srgb, var(--hb-color-text-primary) 11%, transparent)",
  },
  animated: {
    animationName: pulse,
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    [REDUCE]: { animationName: "none" },
  },
  text: { height: "1.2em", borderRadius: 4, transformOrigin: "0 55%", transform: "scale(1, 0.6)" },
  circular: { borderRadius: "50%" },
  rectangular: { borderRadius: 4 },
  sizer: { visibility: "hidden", display: "block" },
});

const cx = (a: string | undefined, b: string | undefined): string | undefined =>
  [a, b].filter(Boolean).join(" ") || undefined;

const VARIANT_STYLE = {
  text: styles.text,
  circular: styles.circular,
  rectangular: styles.rectangular,
} as const;

export const Skeleton = ({
  variant = "text",
  width,
  height,
  animation = "pulse",
  className,
  style,
  children,
  ...rest
}: SkeletonProps) => {
  const sx = stylex.props(
    styles.root,
    VARIANT_STYLE[variant],
    animation !== false && styles.animated,
  );
  const dynamic: CSSProperties = {};

  if (width != null) dynamic.width = width;
  if (height != null) dynamic.height = height;
  // With children the skeleton sizes to them; without an explicit width, text
  // spans the full line.
  if (width == null && !children && variant !== "circular") dynamic.width = "100%";

  return (
    <span
      {...rest}
      aria-hidden="true"
      className={cx(sx.className, className)}
      style={{ ...sx.style, ...dynamic, ...style }}
    >
      {children && <span {...stylex.props(styles.sizer)}>{children}</span>}
    </span>
  );
};
