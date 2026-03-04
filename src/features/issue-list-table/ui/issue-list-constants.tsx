import {
  BugReportOutlined,
  BookmarkOutlined,
  CheckBoxOutlined,
  BoltOutlined,
  AccountTreeOutlined,
} from "@mui/icons-material";
import type {
  IssueKind,
  IssuePriority,
  IssueStatusCategory,
} from "@/entities/issue";

/* ── 컬럼 정의 ─────────────────────────── */

export const COLUMNS = [
  { key: "issueKey" as const, label: "키", sortable: true },
  { key: "type" as const, label: "유형", sortable: false },
  { key: "title" as const, label: "제목", sortable: true },
  { key: "statusCategory" as const, label: "상태", sortable: true },
  { key: "priority" as const, label: "우선순위", sortable: true },
  { key: "assignee" as const, label: "담당자", sortable: true },
];

export type ColKey = (typeof COLUMNS)[number]["key"];

export const HEADER_ROW_COUNT = 1;
export const MIN_COL_WIDTH = 50;

/* ── 색상 상수 ─────────────────────────── */

export const HEADER_BG = "#f8f9fb";
export const HEADER_TEXT = "#6b7280";
export const ROW_EVEN = "#ffffff";
export const ROW_ODD = "#fafbfc";
export const BORDER_COLOR = "#f0f2f5";

export const KIND_ICON: Record<IssueKind, React.ReactNode> = {
  STORY: <BookmarkOutlined sx={{ fontSize: 16, color: "#2ca87f" }} />,
  TASK: <CheckBoxOutlined sx={{ fontSize: 16, color: "#4680ff" }} />,
  BUG: <BugReportOutlined sx={{ fontSize: 16, color: "#dc2626" }} />,
  EPIC: <BoltOutlined sx={{ fontSize: 16, color: "#7c3aed" }} />,
  SUBTASK: <AccountTreeOutlined sx={{ fontSize: 16, color: "#0891b2" }} />,
};

export const STATUS_CHIP_COLOR: Record<IssueStatusCategory, string> = {
  TODO: "#5b6a98",
  IN_PROGRESS: "#4680ff",
  DONE: "#2ca87f",
};

export const PRIORITY_COLOR: Record<IssuePriority, string> = {
  CRITICAL: "#dc2626",
  HIGH: "#e58a00",
  MEDIUM: "#9ca3af",
  LOW: "#4680ff",
};

export const COL_WIDTH_RATIOS = [0.12, 0.06, 0.38, 0.15, 0.14, 0.15];
