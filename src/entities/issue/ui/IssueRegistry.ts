import type { SvgIconProps } from "@mui/material";
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
import type { IssueKind, IssuePriority } from "../model/issue.model";

type IconComponent = React.ComponentType<SvgIconProps>;

interface IssueKindConfig {
  Icon: IconComponent;
  color: string;
  bg: string;
}

interface IssuePriorityConfig {
  Icon: IconComponent;
  color: string;
}

export const ISSUE_KIND_REGISTRY: Record<IssueKind, IssueKindConfig> = {
  STORY: { Icon: BookmarkOutlined, color: "#2ca87f", bg: "#e8f5e9" },
  TASK: { Icon: CheckBoxOutlined, color: "#4680ff", bg: "#e3f2fd" },
  BUG: { Icon: BugReportOutlined, color: "#dc2626", bg: "#ffeef0" },
  EPIC: { Icon: BoltOutlined, color: "#7c3aed", bg: "#f3e8ff" },
  SUBTASK: { Icon: AccountTreeOutlined, color: "#0891b2", bg: "#e0f7fa" },
};

export const ISSUE_PRIORITY_REGISTRY: Record<
  IssuePriority,
  IssuePriorityConfig
> = {
  CRITICAL: { Icon: KeyboardDoubleArrowUp, color: "#dc2626" },
  HIGH: { Icon: KeyboardArrowUp, color: "#e58a00" },
  MEDIUM: { Icon: Remove, color: "#9ca3af" },
  LOW: { Icon: KeyboardArrowDown, color: "#4680ff" },
};
