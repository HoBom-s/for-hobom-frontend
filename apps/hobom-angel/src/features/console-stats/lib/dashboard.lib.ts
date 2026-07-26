import type { MonthlyAdoptionPoint } from "@/entities/shelter";

// Bar fills for the adoption-trend chart: the latest month is solid accent, the
// earlier months a soft tint — matching the §07 dashboard mock.
const BAR_CURRENT = "oklch(0.56 0.078 155)";
const BAR_PAST = "oklch(0.95 0.03 155)";

/** Adoption rate (0–1) as a whole-percent string, e.g. 0.634 → "63%". */
export const formatAdoptionRate = (rate: number): string => `${Math.round(rate * 100)}%`;

export interface AdoptionDelta {
  direction: "up" | "down" | "flat";
  arrow: string;
  caption: string;
}

/** Month-over-month adoption change, ready to render (arrow + caption). */
export const adoptionDelta = (thisMonth: number, lastMonth: number): AdoptionDelta => {
  const diff = thisMonth - lastMonth;

  if (diff > 0) return { direction: "up", arrow: "▲", caption: `지난달 +${diff}` };
  if (diff < 0) return { direction: "down", arrow: "▼", caption: `지난달 ${diff}` };

  return { direction: "flat", arrow: "—", caption: "지난달과 같음" };
};

/** `YYYY-MM` → `M월`; falls back to the raw value if it isn't a month. */
export const monthLabel = (month: string): string => {
  const parsed = Number(month.slice(5, 7));

  return Number.isNaN(parsed) || parsed < 1 ? month : `${parsed}월`;
};

export interface AdoptionBar {
  month: string;
  label: string;
  count: number;
  fill: string;
}

/** Map the trend to chart rows, highlighting the latest (current) month. */
export const toAdoptionBars = (points: readonly MonthlyAdoptionPoint[]): AdoptionBar[] =>
  points.map((point, index) => ({
    month: point.month,
    label: monthLabel(point.month),
    count: point.count,
    fill: index === points.length - 1 ? BAR_CURRENT : BAR_PAST,
  }));
