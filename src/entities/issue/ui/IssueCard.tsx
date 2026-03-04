import { Avatar, Box, Chip, Typography } from "@mui/material";
import {
  BugReportOutlined,
  BookmarkOutlined,
  CheckBoxOutlined,
  BoltOutlined,
  AccountTreeOutlined,
  KeyboardArrowUp,
  KeyboardDoubleArrowUp,
  Remove,
  KeyboardArrowDown,
} from "@mui/icons-material";
import type { IssueKind, IssuePriority } from "../model/issue.model";
import type { IssueType } from "../api/issue.type";

const KIND_CONFIG: Record<
  IssueKind,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  STORY: {
    icon: <BookmarkOutlined sx={{ fontSize: 14 }} />,
    color: "#2ca87f",
    bg: "#e8f5e9",
  },
  TASK: {
    icon: <CheckBoxOutlined sx={{ fontSize: 14 }} />,
    color: "#4680ff",
    bg: "#e3f2fd",
  },
  BUG: {
    icon: <BugReportOutlined sx={{ fontSize: 14 }} />,
    color: "#dc2626",
    bg: "#ffeef0",
  },
  EPIC: {
    icon: <BoltOutlined sx={{ fontSize: 14 }} />,
    color: "#7c3aed",
    bg: "#f3e8ff",
  },
  SUBTASK: {
    icon: <AccountTreeOutlined sx={{ fontSize: 14 }} />,
    color: "#0891b2",
    bg: "#e0f7fa",
  },
};

const PRIORITY_ICON: Record<IssuePriority, React.ReactNode> = {
  CRITICAL: <KeyboardDoubleArrowUp sx={{ fontSize: 16, color: "#dc2626" }} />,
  HIGH: <KeyboardArrowUp sx={{ fontSize: 16, color: "#e58a00" }} />,
  MEDIUM: <Remove sx={{ fontSize: 16, color: "#9ca3af" }} />,
  LOW: <KeyboardArrowDown sx={{ fontSize: 16, color: "#4680ff" }} />,
};

interface IssueCardProps {
  issue: IssueType;
  isDragOverlay?: boolean;
  parentIssueKey?: string;
  childCount?: number;
  progress?: { completed: number; total: number };
}

export const IssueCard = ({
  issue,
  isDragOverlay,
  parentIssueKey,
  childCount = 0,
  progress,
}: IssueCardProps) => {
  const kind = KIND_CONFIG[issue.type];

  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: "background.paper",
        borderRadius: 2,
        borderLeft: `3px solid ${kind.color}`,
        cursor: isDragOverlay ? "grabbing" : "grab",
        boxShadow: isDragOverlay
          ? "0 12px 28px rgba(0,0,0,0.16)"
          : "0 1px 3px rgba(0,0,0,0.06)",
        "&:hover": isDragOverlay
          ? undefined
          : {
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transform: "translateY(-1px)",
            },
        transition: "box-shadow 0.15s, transform 0.15s",
        userSelect: "none",
      }}
    >
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{
          mb: 1,
          lineHeight: 1.4,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
        }}
      >
        {issue.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              borderRadius: 0.75,
              bgcolor: kind.bg,
              color: kind.color,
            }}
          >
            {kind.icon}
          </Box>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", fontWeight: 500, fontSize: 11 }}
          >
            {issue.issueKey}
          </Typography>
          {parentIssueKey && (
            <Chip
              label={`↳ ${parentIssueKey}`}
              size="small"
              sx={{
                height: 18,
                fontSize: 10,
                fontWeight: 600,
                bgcolor: "#f3e8ff",
                color: "#7c3aed",
                "& .MuiChip-label": { px: 0.5 },
              }}
            />
          )}
          {childCount > 0 && (
            <Chip
              label={`${childCount} 하위`}
              size="small"
              sx={{
                height: 18,
                fontSize: 10,
                fontWeight: 600,
                bgcolor: "#e8eaed",
                color: "#5f6368",
                "& .MuiChip-label": { px: 0.5 },
              }}
            />
          )}
          {progress && progress.total > 0 && (
            <Chip
              label={`${progress.completed}/${progress.total} 완료`}
              size="small"
              sx={{
                height: 18,
                fontSize: 10,
                fontWeight: 600,
                bgcolor:
                  progress.completed === progress.total ? "#e8f5e9" : "#fff3e0",
                color:
                  progress.completed === progress.total ? "#2ca87f" : "#e58a00",
                "& .MuiChip-label": { px: 0.5 },
              }}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {PRIORITY_ICON[issue.priority]}
          {issue.assignee && (
            <Avatar
              sx={{
                width: 22,
                height: 22,
                fontSize: 10,
                fontWeight: 700,
                bgcolor: "#e8eaed",
                color: "#5f6368",
              }}
            >
              {issue.assignee.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Box>
      </Box>
    </Box>
  );
};
