import type { ChartConfig, ChartDatum, ChartMargin } from "./types";

const DEFAULT_MARGIN: ChartMargin = { top: 12, right: 16, bottom: 28, left: 44 };

/** A series with all styling resolved (color/label filled in). */
export interface ResolvedSeries {
  key: string;
  label: string;
  color: string;
}

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

  const value: unknown = Reflect.get(datum, key);
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

/** Coerce a datum field to a string. */
export const str = (datum: ChartDatum, key: string | undefined): string => {
  if (!key) return "";

  const value: unknown = Reflect.get(datum, key);

  return value != null ? String(value) : "";
};

export const formatNumber = (config: ChartConfig, value: number): string =>
  config.formatValue ? config.formatValue(value) : String(value);

export const formatCategory = (config: ChartConfig, value: string): string =>
  config.formatX ? config.formatX(value) : value;

/**
 * Normalize a config to a resolved series list: `config.series` when present,
 * otherwise a single series from `config.y`. Colors fall back to the palette.
 */
export const resolveSeries = (config: ChartConfig): ResolvedSeries[] => {
  const palette = config.colors ?? DEFAULT_PALETTE;

  if (config.series && config.series.length > 0) {
    return config.series.map((series, index) => ({
      key: series.key,
      label: series.label ?? series.key,
      color: series.color ?? palette[index % palette.length] ?? PRIMARY_COLOR,
    }));
  }

  const key = config.y ?? "";

  return [{ key, label: key, color: config.color ?? PRIMARY_COLOR }];
};

/**
 * Legend rows for a chart: one per slice for a donut (`value`+`label`), one per
 * series for a multi-series cartesian chart, or none for a single series.
 */
export const legendItems = (
  data: readonly ChartDatum[],
  config: ChartConfig,
): { label: string; color: string }[] => {
  const palette = config.colors ?? DEFAULT_PALETTE;

  if (config.value != null && config.label != null) {
    return data.map((datum, index) => ({
      label: str(datum, config.label),
      color: colorFromDatum(datum, config) ?? palette[index % palette.length] ?? PRIMARY_COLOR,
    }));
  }

  const series = resolveSeries(config);

  return series.length > 1 ? series.map((s) => ({ label: s.label, color: s.color })) : [];
};

/** A per-datum color read from `config.colorKey`, or null when unset/empty. */
export const colorFromDatum = (datum: ChartDatum, config: ChartConfig): string | null => {
  if (!config.colorKey) return null;

  const value: unknown = Reflect.get(datum, config.colorKey);

  return typeof value === "string" && value.length > 0 ? value : null;
};

/** A DOM-safe `<linearGradient>` id derived from arbitrary string parts. */
export const gradientId = (...parts: string[]): string =>
  `hb-grad-${parts.map((part) => part.replace(/[^a-z0-9]/gi, "")).join("-")}`;

/** SVG path for a rectangle with only its top two corners rounded. */
export const roundedTopRect = (x: number, y: number, w: number, h: number, r: number): string =>
  `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} ` +
  `L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;

/** SVG path for a rectangle with only its right two corners rounded. */
export const roundedRightRect = (x: number, y: number, w: number, h: number, r: number): string =>
  `M${x},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} ` +
  `L${x + w},${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} L${x},${y + h} Z`;

/** Index of the position closest to `cursor` (0 when the list is empty). */
export const nearestIndex = (positions: readonly number[], cursor: number): number => {
  let best = 0;
  let bestDistance = Infinity;

  positions.forEach((position, index) => {
    const distance = Math.abs(position - cursor);

    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });

  return best;
};
