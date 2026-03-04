import {
  BugReportOutlined,
  BookmarkOutlined,
  CheckBoxOutlined,
  BoltOutlined,
  AccountTreeOutlined,
  KeyboardDoubleArrowUp,
  KeyboardArrowUp,
  Remove,
  KeyboardArrowDown,
} from "@mui/icons-material";
import type { IssueKind, IssuePriority } from "@/entities/issue";
import type { SprintStatus } from "@/entities/sprint";

export const KIND_ICON: Record<IssueKind, React.ReactNode> = {
  STORY: <BookmarkOutlined sx={{ fontSize: 16, color: "#2ca87f" }} />,
  TASK: <CheckBoxOutlined sx={{ fontSize: 16, color: "#4680ff" }} />,
  BUG: <BugReportOutlined sx={{ fontSize: 16, color: "#dc2626" }} />,
  EPIC: <BoltOutlined sx={{ fontSize: 16, color: "#7c3aed" }} />,
  SUBTASK: <AccountTreeOutlined sx={{ fontSize: 16, color: "#0891b2" }} />,
};

export const PRIORITY_ICON: Record<IssuePriority, React.ReactNode> = {
  CRITICAL: <KeyboardDoubleArrowUp sx={{ fontSize: 16, color: "#dc2626" }} />,
  HIGH: <KeyboardArrowUp sx={{ fontSize: 16, color: "#e58a00" }} />,
  MEDIUM: <Remove sx={{ fontSize: 16, color: "#9ca3af" }} />,
  LOW: <KeyboardArrowDown sx={{ fontSize: 16, color: "#4680ff" }} />,
};

export const STATUS_COLOR: Record<SprintStatus, string> = {
  PLANNING: "#9ca3af",
  ACTIVE: "#4680ff",
  COMPLETED: "#2ca87f",
};
