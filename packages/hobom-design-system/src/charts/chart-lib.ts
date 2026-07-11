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

/** SVG path for a rectangle with only its top two corners rounded. */
export const roundedTopRect = (x: number, y: number, w: number, h: number, r: number): string =>
  `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} ` +
  `L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;

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
