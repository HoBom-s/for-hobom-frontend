import type { CSSProperties, ReactNode } from "react";

/**
 * A single datum: any object. Renderers read fields by the keys named in
 * `ChartConfig`, via the `num`/`str` helpers. Typed as `object` (not
 * `Record<string, unknown>`) so `interface`-declared rows are accepted too —
 * interfaces lack the implicit index signature `Record` requires.
 */
export type ChartDatum = object;

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** One measure drawn across the x axis. Multiple series share the same x. */
export interface ChartSeries {
  /** Field key for this series' value. */
  key: string;
  /** Legend/tooltip label; defaults to `key`. */
  label?: string;
  /** Series color; defaults to the palette. */
  color?: string;
}

/**
 * External configuration injected per chart. Cartesian charts (line/area/bar)
 * read `x` plus either `y` (single series) or `series` (multi); part-to-whole
 * charts (donut) read `label`/`value`. Everything else is optional styling.
 */
export interface ChartConfig {
  /** Field key for the x axis / category. */
  x?: string;
  /** Field key for the y axis / measure (single series). */
  y?: string;
  /** Multiple measures over the same x. Takes precedence over `y`. */
  series?: readonly ChartSeries[];
  /** Field key for a slice's category (donut). */
  label?: string;
  /** Field key for a slice's measure (donut). */
  value?: string;
  /** Primary series color. */
  color?: string;
  /** Palette for multi-slice/series charts. */
  colors?: readonly string[];
  /** Field key for a per-datum color (bar/donut); overrides series/palette color. */
  colorKey?: string;
  /** Stack cartesian series instead of grouping them side by side (bar). */
  stacked?: boolean;
  /** Lay bars along the x axis with categories on the y axis (bar). */
  horizontal?: boolean;
  /** Fill bars with a subtle top-to-bottom gradient. Defaults to true. */
  gradient?: boolean;
  /** Render the built-in legend. Defaults to true; disable to supply your own. */
  legend?: boolean;
  /** Override the default plot margins. */
  margin?: Partial<ChartMargin>;
  /** Format a value for axis ticks / labels. */
  formatValue?: (value: number) => string;
  /** Format an x category for its tick label. */
  formatX?: (value: string) => string;
}

/** One row in the hover tooltip (a series/slice value at the hovered point). */
export interface ChartHoverEntry {
  label: string;
  value: number;
  color: string;
}

/** The point under the pointer: its pixel anchor and the values to show. */
export interface ChartHover {
  index: number;
  /** SVG-pixel anchor point (tooltip is placed relative to it). */
  x: number;
  y: number;
  /** Heading (usually the x category). */
  title: string;
  entries: readonly ChartHoverEntry[];
}

/** What the factory hands a renderer: the data, its box, and hover plumbing. */
export interface ChartRenderContext {
  data: readonly ChartDatum[];
  config: ChartConfig;
  width: number;
  height: number;
  /** The currently hovered datum, or null. */
  hover: ChartHover | null;
  /** Report (or clear) the hovered datum; the factory renders the tooltip. */
  setHover: (hover: ChartHover | null) => void;
}

/** A chart type: a pure function from context to SVG children. */
export type ChartRenderer = (ctx: ChartRenderContext) => ReactNode;

export type ChartRegistry = Record<string, ChartRenderer>;

export interface ChartProps<TType extends string> {
  /** Which registered renderer to use. */
  type: TType;
  data: readonly ChartDatum[];
  config?: ChartConfig;
  /** Plot height in px (width fills the container). Defaults to 240. */
  height?: number;
  /** Accessible description of the chart. */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}
