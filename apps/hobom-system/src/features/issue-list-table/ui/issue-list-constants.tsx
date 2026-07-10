/* ── 컬럼 정의 ─────────────────────────── */

export const COLUMNS = [
  { key: "issueKey" as const, label: "키", sortable: true, align: "left" as const },
  { key: "type" as const, label: "유형", sortable: false, align: "center" as const },
  { key: "title" as const, label: "제목", sortable: true, align: "left" as const },
  { key: "status" as const, label: "상태", sortable: true, align: "left" as const },
  { key: "priority" as const, label: "우선순위", sortable: true, align: "left" as const },
  { key: "assignee" as const, label: "담당자", sortable: true, align: "right" as const },
  { key: "labels" as const, label: "라벨", sortable: false, align: "right" as const },
  { key: "storyPoints" as const, label: "SP", sortable: true, align: "right" as const },
  { key: "dueDate" as const, label: "마감일", sortable: true, align: "right" as const },
];

export type ColKey = (typeof COLUMNS)[number]["key"];

export const HEADER_ROW_COUNT = 1;
export const MIN_COL_WIDTH = 50;

/* ── 색상 상수 (CSS 변수로 다크모드 대응) ── */

export const HEADER_BG = "var(--hb-color-neutral)";
export const HEADER_TEXT = "var(--hb-color-text-secondary)";
export const ROW_EVEN = "var(--hb-color-surface)";
export const ROW_ODD = "var(--hb-color-neutral)";
export const BORDER_COLOR = "var(--hb-color-border)";

export const COL_WIDTH_RATIOS = [0.08, 0.05, 0.28, 0.1, 0.1, 0.1, 0.12, 0.07, 0.1];
