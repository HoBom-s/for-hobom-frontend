import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

type GridSize = number | Partial<Record<Breakpoint, number>>;

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Lay children out as a flex row with gutters. */
  container?: boolean;
  /** Gutter between children, in theme spacing units (× 8px). */
  spacing?: number;
  /** Column span out of 12 — a number, or per-breakpoint values. */
  size?: GridSize;
  children?: ReactNode;
}

const COLUMNS = 12;
const BREAKPOINT_ORDER: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
const BREAKPOINT_MIN: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    flexGrow: 0,
    boxSizing: "border-box",
    minWidth: 0,
    maxWidth: "100%",
    // Width accounts for the container gutter so a row of spans summing to 12
    // fits exactly. `--hb-grid-span` is set per breakpoint; `--hb-grid-gap`
    // comes from the container.
    flexBasis:
      "calc(var(--hb-grid-span, 12) / 12 * 100% - (12 - var(--hb-grid-span, 12)) / 12 * var(--hb-grid-gap, 0px))",
  },
});

interface ResponsiveSpan {
  className: string;
  css: string;
}

/** Build the per-breakpoint `--hb-grid-span` rules for a responsive `size`. */
const responsiveSpan = (size: Partial<Record<Breakpoint, number>>): ResponsiveSpan => {
  const entries = BREAKPOINT_ORDER.filter((bp) => size[bp] != null).map(
    (bp) => [bp, size[bp] as number] as const,
  );
  const className = `hb-grid-${entries.map(([bp, v]) => `${bp}${v}`).join("-")}`;

  let base = COLUMNS;
  let media = "";

  for (const [bp, v] of entries) {
    if (BREAKPOINT_MIN[bp] === 0) {
      base = v;
    } else {
      media += `@media (min-width:${BREAKPOINT_MIN[bp]}px){.${className}{--hb-grid-span:${v}}}`;
    }
  }

  return { className, css: `.${className}{--hb-grid-span:${base}}${media}` };
};

export const Grid = ({
  container = false,
  spacing,
  size,
  className,
  style,
  children,
  ...rest
}: GridProps) => {
  const dynamic: CSSProperties = {};
  let spanClass: string | undefined;
  let spanCss: string | undefined;

  if (container && spacing != null) {
    const gap = `${spacing * 8}px`;

    dynamic.gap = gap;
    (dynamic as Record<string, string>)["--hb-grid-gap"] = gap;
  }

  if (size != null) {
    if (typeof size === "number") {
      (dynamic as Record<string, string>)["--hb-grid-span"] = String(size);
    } else {
      const responsive = responsiveSpan(size);

      spanClass = responsive.className;
      spanCss = responsive.css;
    }
  }

  const sx = stylex.props(container && styles.container, size != null && styles.item);

  return (
    <div
      {...rest}
      className={[sx.className, spanClass, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...dynamic, ...style }}
    >
      {spanCss && (
        <style href={spanClass} precedence="medium">
          {spanCss}
        </style>
      )}
      {children}
    </div>
  );
};
