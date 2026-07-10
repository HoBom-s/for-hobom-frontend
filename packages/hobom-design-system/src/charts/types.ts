import type { CSSProperties, ReactNode } from "react";

/** A single datum. Renderers read fields by the keys named in `ChartConfig`. */
export type ChartDatum = Record<string, unknown>;

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * External configuration injected per chart. Cartesian charts (line/area/bar)
 * read `x`/`y`; part-to-whole charts (donut) read `label`/`value`. Everything
 * else is optional styling.
 */
export interface ChartConfig {
  /** Field key for the x axis / category. */
  x?: string;
  /** Field key for the y axis / measure. */
  y?: string;
  /** Field key for a slice's category (donut). */
  label?: string;
  /** Field key for a slice's measure (donut). */
  value?: string;
  /** Primary series color. */
  color?: string;
  /** Palette for multi-slice/series charts. */
  colors?: readonly string[];
  /** Override the default plot margins. */
  margin?: Partial<ChartMargin>;
  /** Format a value for axis ticks / labels. */
  formatValue?: (value: number) => string;
  /** Format an x category for its tick label. */
  formatX?: (value: string) => string;
}

/** What the factory hands a renderer: the data, its config, and the pixel box. */
export interface ChartRenderContext {
  data: readonly ChartDatum[];
  config: ChartConfig;
  width: number;
  height: number;
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
