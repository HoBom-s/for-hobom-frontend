import { memo } from "react";
import { Hb } from "@/shared/ui";
import { ISSUE_KIND_REGISTRY, ISSUE_PRIORITY_REGISTRY } from "./IssueRegistry";
import type { IssueType } from "../api/issue.type";

interface IssueCardProps {
  issue: IssueType;
  isDragOverlay?: boolean;
  parentIssueKey?: string;
  childCount?: number;
  progress?: { completed: number; total: number };
}

export const IssueCard = memo(
  ({
    issue,
    isDragOverlay,
    parentIssueKey,
    childCount = 0,
    progress,
  }: IssueCardProps) => {
    const kind = ISSUE_KIND_REGISTRY[issue.type];
    const priority = ISSUE_PRIORITY_REGISTRY[issue.priority];

    return (
      <Hb.Box
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
        <Hb.Text
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
        </Hb.Text>

        <Hb.Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Hb.Box
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
              <kind.Icon sx={{ fontSize: 14 }} />
            </Hb.Box>
            <Hb.Text
              variant="caption"
              sx={{ color: "text.disabled", fontWeight: 500, fontSize: 11 }}
            >
              {issue.issueKey}
            </Hb.Text>
            {parentIssueKey && (
              <Hb.Chip
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
              <Hb.Chip
                label={`${childCount} 하위`}
                size="small"
                sx={{
                  height: 18,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor: "action.selected",
                  color: "text.secondary",
                  "& .MuiChip-label": { px: 0.5 },
                }}
              />
            )}
            {progress && progress.total > 0 && (
              <Hb.Chip
                label={`${progress.completed}/${progress.total} 완료`}
                size="small"
                sx={{
                  height: 18,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor:
                    progress.completed === progress.total
                      ? "#e8f5e9"
                      : "#fff3e0",
                  color:
                    progress.completed === progress.total
                      ? "#2ca87f"
                      : "#e58a00",
                  "& .MuiChip-label": { px: 0.5 },
                }}
              />
            )}
          </Hb.Box>

          <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <priority.Icon sx={{ fontSize: 16, color: priority.color }} />
            {issue.assignee && (
              <Hb.Avatar
                sx={{
                  width: 22,
                  height: 22,
                  fontSize: 10,
                  fontWeight: 700,
                  bgcolor: "action.selected",
                  color: "text.secondary",
                }}
              >
                {issue.assignee.charAt(0).toUpperCase()}
              </Hb.Avatar>
            )}
          </Hb.Box>
        </Hb.Box>
      </Hb.Box>
    );
  },
);

IssueCard.displayName = "IssueCard";
