export const COLUMNS = [
  { key: "method" as const, label: "Method" },
  { key: "path" as const, label: "Path" },
  { key: "total" as const, label: "Total" },
  { key: "errors" as const, label: "Errors" },
  { key: "rate" as const, label: "Error Rate" },
];

export type ColKey = (typeof COLUMNS)[number]["key"];

export const COL_WIDTH_RATIOS = [0.1, 0.4, 0.12, 0.12, 0.26];
export const HEADER_ROW_COUNT = 1;
export const MIN_COL_WIDTH = 50;

export const HEADER_BG = "#f8f9fb";
export const HEADER_TEXT = "#6b7280";
export const ROW_EVEN = "#ffffff";
export const ROW_ODD = "#fafbfc";
export const BORDER_COLOR = "#f0f2f5";
export const RESIZE_HANDLE = "#818cf8";

export const METHOD_CHIP_COLOR: Record<string, string> = {
  GET: "#60a5fa",
  POST: "#34d399",
  PUT: "#fbbf24",
  DELETE: "#f87171",
  PATCH: "#a78bfa",
};

export const getErrorRateColor = (rate: number) => {
  if (rate >= 0.5) return "#f87171";
  if (rate >= 0.1) return "#fb923c";
  return "#34d399";
};
