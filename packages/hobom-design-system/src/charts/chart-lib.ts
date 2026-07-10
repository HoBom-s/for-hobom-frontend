import type { ChartConfig, ChartDatum, ChartMargin } from "./types";

const DEFAULT_MARGIN: ChartMargin = { top: 12, right: 16, bottom: 28, left: 44 };

/** Default single-series color. */
export const PRIMARY_COLOR = "var(--hb-color-accent)";

/** Neutral, palette-aligned slice colors (grayscale ramp + one accent). */
export const DEFAULT_PALETTE: readonly string[] = [
  PRIMARY_COLOR,
  "#9ca3af",
  "#4ade80",
  "#60a5fa",
  "#fbbf24",
  "#f87171",
  "#c084fc",
];

export const resolveMargin = (config: ChartConfig): ChartMargin => ({
  ...DEFAULT_MARGIN,
  ...config.margin,
});

/** Coerce a datum field to a finite number (0 when absent/non-numeric). */
export const num = (datum: ChartDatum, key: string | undefined): number => {
  if (!key) return 0;

  const value = Number(datum[key]);

  return Number.isFinite(value) ? value : 0;
};

/** Coerce a datum field to a string. */
export const str = (datum: ChartDatum, key: string | undefined): string =>
  key && datum[key] != null ? String(datum[key]) : "";

export const formatNumber = (config: ChartConfig, value: number): string =>
  config.formatValue ? config.formatValue(value) : String(value);

export const formatCategory = (config: ChartConfig, value: string): string =>
  config.formatX ? config.formatX(value) : value;
