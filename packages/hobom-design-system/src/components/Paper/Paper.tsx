import type { HTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  /** `"elevation"` (shadow) or `"outlined"` (border). Defaults to `"elevation"`. */
  variant?: "elevation" | "outlined";
  /** Shadow depth for the elevation variant. `0` is flat. Defaults to `1`. */
  elevation?: number;
}

const styles = stylex.create({
  base: {
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    borderRadius: 8,
    boxSizing: "border-box",
  },
  outlined: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
  },
  elev0: { boxShadow: "none" },
  elev1: { boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.03)" },
  elev2: { boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)" },
});

function elevationStyle(elevation: number) {
  if (elevation <= 0) return styles.elev0;
  if (elevation === 1) return styles.elev1;
  return styles.elev2;
}

export const Paper = ({
  variant = "elevation",
  elevation = 1,
  children,
  className,
  style,
  ...rest
}: PaperProps) => {
  const sx = stylex.props(
    styles.base,
    variant === "outlined" ? styles.outlined : elevationStyle(elevation),
  );

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ")}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </div>
  );
};
