export const HEADER_ROW_COUNT = 1;
export const MIN_COL_WIDTH = 60;
export const ROW_NUM_WIDTH = 52;
export const ACTIONS_WIDTH = 80;

export const COLUMNS = [
  { key: "rowNum" as const, label: "#" },
  { key: "title" as const, label: "제목 / 내용" },
  { key: "scheduledAt" as const, label: "발송 시간" },
  { key: "sendStatus" as const, label: "상태" },
  { key: "actions" as const, label: "" },
];

export type ColKey = (typeof COLUMNS)[number]["key"];

export const COLORS = {
  headerBg: "#f8f9fb",
  headerText: "#6b7280",
  rowEven: "#ffffff",
  rowOdd: "#fafbfc",
  border: "#f0f2f5",
  titleText: "#2d3748",
  subtitleText: "#a0aec0",
  dateText: "#374151",
  rowNum: "#c9d3e0",
  resizeHandle: "#4680ff",
  headerBorder: "#e9ecef",
  pendingBg: "#fff3e0",
  pendingText: "#e65100",
  sentBg: "#e8f5e9",
  sentText: "#2e7d32",
} as const;
