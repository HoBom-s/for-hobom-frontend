import { memo } from "react";
import { Avatar, Chip } from "@mui/material";
import {
  ISSUE_KIND_REGISTRY,
  ISSUE_PRIORITY_LABEL,
  ISSUE_PRIORITY_REGISTRY,
  type IssueType,
} from "@/entities/issue";
import {
  getStatusName,
  getStatusColor,
  type WorkflowStatus,
} from "@/entities/project";
import { type ColKey, BORDER_COLOR } from "./issue-list-constants";

interface BodyCellProps {
  colKey: ColKey;
  row: IssueType;
  bg: string;
  statuses: WorkflowStatus[];
  onStatusClick: (
    e: React.MouseEvent<HTMLElement>,
    issueId: string,
    currentStatus: string,
  ) => void;
  onRowClick?: (issueId: string) => void;
}

export const BodyCell = memo(
  ({ colKey, row, bg, statuses, onStatusClick, onRowClick }: BodyCellProps) => {
    const baseCellStyle: React.CSSProperties = {
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0 12px",
      backgroundColor: bg,
      borderBottom: `1px solid ${BORDER_COLOR}`,
      boxSizing: "border-box",
      overflow: "hidden",
      cursor: onRowClick ? "pointer" : undefined,
    };

    const handleRowClick = () => onRowClick?.(row.id);

    switch (colKey) {
      case "issueKey":
        return (
          <div style={baseCellStyle} onClick={handleRowClick}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--mui-palette-text-disabled)",
                whiteSpace: "nowrap",
              }}
            >
              {row.issueKey}
            </span>
          </div>
        );

      case "type":
        return (
          <div
            style={{ ...baseCellStyle, justifyContent: "center" }}
            onClick={handleRowClick}
          >
            {(() => {
              const config = ISSUE_KIND_REGISTRY[row.type];
              return <config.Icon sx={{ fontSize: 16, color: config.color }} />;
            })()}
          </div>
        );

      case "title":
        return (
          <div style={baseCellStyle} onClick={handleRowClick}>
            <span
              style={{
                fontSize: 13,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {row.title}
            </span>
          </div>
        );

      case "status": {
        const color = getStatusColor(statuses, row.status);
        return (
          <div
            style={baseCellStyle}
            onClick={handleRowClick}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Chip
              label={getStatusName(statuses, row.status)}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onStatusClick(e, row.id, row.status);
              }}
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 600,
                bgcolor: `${color}18`,
                color,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: `${color}28`,
                },
              }}
            />
          </div>
        );
      }

      case "priority":
        return (
          <div style={baseCellStyle} onClick={handleRowClick}>
            <Chip
              label={ISSUE_PRIORITY_LABEL[row.priority]}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 500,
                bgcolor: `${ISSUE_PRIORITY_REGISTRY[row.priority].color}18`,
                color: ISSUE_PRIORITY_REGISTRY[row.priority].color,
              }}
            />
          </div>
        );

      case "assignee":
        return (
          <div style={baseCellStyle} onClick={handleRowClick}>
            {row.assignee ? (
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: 11,
                  fontWeight: 700,
                  bgcolor: "action.selected",
                  color: "text.secondary",
                }}
              >
                {row.assignee.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <span
                style={{
                  fontSize: 12,
                  color: "var(--mui-palette-text-disabled)",
                }}
              >
                -
              </span>
            )}
          </div>
        );
    }
  },
);

BodyCell.displayName = "BodyCell";
