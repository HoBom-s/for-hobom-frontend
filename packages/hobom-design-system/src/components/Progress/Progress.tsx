import type { CSSProperties, HTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";

const spin = stylex.keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

// A single bar sweeping across the track — an indeterminate LinearProgress.
const slide = stylex.keyframes({
  "0%": { left: "-40%", width: "40%" },
  "50%": { left: "20%", width: "60%" },
  "100%": { left: "100%", width: "40%" },
});

const styles = stylex.create({
  circular: {
    display: "inline-block",
    boxSizing: "border-box",
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: "var(--hb-color-accent)",
    borderTopColor: "transparent",
    animationName: spin,
    animationDuration: "0.8s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
  linearTrack: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "color-mix(in srgb, var(--hb-color-accent) 24%, transparent)",
  },
  linearBar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: "inherit",
  },
  indeterminate: {
    animationName: slide,
    animationDuration: "1.4s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  },
  determinate: { left: 0 },
});

interface CircularProps extends HTMLAttributes<HTMLSpanElement> {
  /** Diameter (px number, or any CSS length). Defaults to `40`. */
  size?: number | string;
}

const Circular = ({ size = 40, className, style, ...rest }: CircularProps) => {
  const sx = stylex.props(styles.circular);
  const dynamic: CSSProperties = {
    width: size,
    height: size,
    borderWidth: typeof size === "number" ? Math.max(2, Math.round(size / 10)) : 4,
  };

  return (
    <span
      role="progressbar"
      aria-label="로딩 중"
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...dynamic, ...style }}
    />
  );
};

interface LinearProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "indeterminate" | "determinate";
  /** Percent filled (0–100) for the determinate variant. */
  value?: number;
  /** Bar color. Defaults to the accent. */
  color?: string;
}

const Linear = ({
  variant = "indeterminate",
  value = 0,
  color = "var(--hb-color-accent)",
  className,
  style,
  ...rest
}: LinearProps) => {
  const track = stylex.props(styles.linearTrack);
  const determinate = variant === "determinate";
  const bar = stylex.props(styles.linearBar, determinate ? styles.determinate : styles.indeterminate);

  return (
    <div
      role="progressbar"
      aria-label="로딩 중"
      aria-valuenow={determinate ? value : undefined}
      {...rest}
      className={[track.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...track.style, ...style }}
    >
      <span
        className={bar.className}
        style={{
          ...bar.style,
          backgroundColor: color,
          ...(determinate ? { width: `${value}%` } : null),
        }}
      />
    </div>
  );
};

export const Progress = { Circular, Linear };
