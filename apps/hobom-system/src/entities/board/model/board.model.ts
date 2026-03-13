import type { BoardColumn } from "../api/board.type";

export const DEFAULT_BOARD_COLUMNS: BoardColumn[] = [
  { statusId: "todo", name: "할 일", wipLimit: null, order: 0 },
  { statusId: "in-progress", name: "진행 중", wipLimit: null, order: 1 },
  { statusId: "done", name: "완료", wipLimit: null, order: 2 },
];

const STATUS_ID_CONFIG: Record<string, { color: string; bg: string }> = {
  todo: { color: "#5b6a98", bg: "#eef0f4" },
  "in-progress": { color: "#4680ff", bg: "#e3f2fd" },
  done: { color: "#2ca87f", bg: "#e8f5e9" },
};

const DEFAULT_STATUS_CONFIG = { color: "#6b7280", bg: "#f3f4f6" };

export const getStatusConfig = (statusId: string) =>
  STATUS_ID_CONFIG[statusId] ?? DEFAULT_STATUS_CONFIG;
