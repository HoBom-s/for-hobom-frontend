/* ── 컬럼 정의 ─────────────────────────── */

export const COLUMNS = [
  { key: "issueKey" as const, label: "키", sortable: true },
  { key: "type" as const, label: "유형", sortable: false },
  { key: "title" as const, label: "제목", sortable: true },
  { key: "status" as const, label: "상태", sortable: true },
  { key: "priority" as const, label: "우선순위", sortable: true },
  { key: "assignee" as const, label: "담당자", sortable: true },
];

export type ColKey = (typeof COLUMNS)[number]["key"];

export const HEADER_ROW_COUNT = 1;
export const MIN_COL_WIDTH = 50;

/* ── 색상 상수 (CSS 변수로 다크모드 대응) ── */

export const HEADER_BG = "var(--mui-palette-action-hover)";
export const HEADER_TEXT = "var(--mui-palette-text-secondary)";
export const ROW_EVEN = "var(--mui-palette-background-paper)";
export const ROW_ODD = "var(--mui-palette-action-hover)";
export const BORDER_COLOR = "var(--mui-palette-divider)";

export const COL_WIDTH_RATIOS = [0.12, 0.06, 0.38, 0.15, 0.14, 0.15];
