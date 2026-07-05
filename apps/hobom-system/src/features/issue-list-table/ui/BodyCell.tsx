import { memo } from "react";
import { ISSUE_PRIORITY_LABEL, type IssueType } from "@/entities/issue";
import { ISSUE_KIND_REGISTRY, ISSUE_PRIORITY_REGISTRY } from "@/entities/issue/ui";
import { getStatusName, getStatusColor, type WorkflowStatus } from "@/entities/project";
import type { ProjectLabelType } from "@/entities/project-label";
import { Hb } from "@/shared/ui";
import { type ColKey, BORDER_COLOR } from "./issue-list-constants";

interface BodyCellProps {
  colKey: ColKey;
  row: IssueType;
  bg: string;
  statuses: WorkflowStatus[];
  labelMap: Map<string, ProjectLabelType>;
  memberMap: Map<string, string>;
  onStatusClick: (e: React.MouseEvent<HTMLElement>, issueId: string, currentStatus: string) => void;
  onRowClick?: (issueId: string) => void;
}

export const BodyCell = memo(
  ({
    colKey,
    row,
    bg,
    statuses,
    labelMap,
    memberMap,
    onStatusClick,
    onRowClick,
  }: BodyCellProps) => {
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

    const interactiveProps = onRowClick
      ? {
          role: "row" as const,
          tabIndex: 0,
          onClick: handleRowClick,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleRowClick();
            }
          },
        }
      : {};

    switch (colKey) {
      case "issueKey":
        return (
          <div style={baseCellStyle} {...interactiveProps}>
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
          <div style={{ ...baseCellStyle, justifyContent: "center" }} {...interactiveProps}>
            {(() => {
              const config = ISSUE_KIND_REGISTRY[row.type];

              return <config.Icon sx={{ fontSize: 16, color: config.color }} />;
            })()}
          </div>
        );

      case "title":
        return (
          <div style={baseCellStyle} {...interactiveProps}>
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
            {...interactiveProps}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Hb.Chip
              label={getStatusName(statuses, row.status)}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onStatusClick(e, row.id, row.status);
              }}
              tone={color}
              style={{ height: 22, fontSize: 11, fontWeight: 600 }}
            />
          </div>
        );
      }

      case "priority":
        return (
          <div style={baseCellStyle} {...interactiveProps}>
            <Hb.Chip
              label={ISSUE_PRIORITY_LABEL[row.priority]}
              size="small"
              style={{
                height: 22,
                fontSize: 11,
                fontWeight: 500,
                backgroundColor: `${ISSUE_PRIORITY_REGISTRY[row.priority].color}18`,
                color: ISSUE_PRIORITY_REGISTRY[row.priority].color,
              }}
            />
          </div>
        );

      case "assignee": {
        const nickname = row.assignee ? memberMap.get(row.assignee) : null;

        return (
          <div
            style={{ ...baseCellStyle, justifyContent: "flex-end", gap: 6 }}
            {...interactiveProps}
          >
            {row.assignee ? (
              <>
                <Hb.Avatar
                  sx={{
                    width: 22,
                    height: 22,
                    fontSize: 11,
                    fontWeight: 700,
                    bgcolor: "action.selected",
                    color: "text.secondary",
                  }}
                >
                  {(nickname ?? row.assignee).charAt(0).toUpperCase()}
                </Hb.Avatar>
                <span style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                  {nickname ?? row.assignee}
                </span>
              </>
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

      case "labels":
        return (
          <div
            style={{ ...baseCellStyle, gap: 4, justifyContent: "flex-end" }}
            {...interactiveProps}
          >
            {row.labels.length > 0 ? (
              row.labels.map((labelId) => {
                const label = labelMap.get(labelId);

                return (
                  <Hb.Chip
                    key={labelId}
                    label={label?.name ?? labelId}
                    size="small"
                    tone={label?.color}
                    style={{ height: 20, fontSize: 11 }}
                  />
                );
              })
            ) : (
              <span style={{ fontSize: 12, color: "var(--mui-palette-text-disabled)" }}>-</span>
            )}
          </div>
        );

      case "storyPoints":
        return (
          <div style={{ ...baseCellStyle, justifyContent: "flex-end" }} {...interactiveProps}>
            <span style={{ fontSize: 13 }}>{row.storyPoints != null ? row.storyPoints : "-"}</span>
          </div>
        );

      case "dueDate": {
        const isOverdue = row.dueDate ? new Date(row.dueDate) < new Date() : false;

        return (
          <div style={{ ...baseCellStyle, justifyContent: "flex-end" }} {...interactiveProps}>
            <span
              style={{
                fontSize: 12,
                color: isOverdue ? "var(--mui-palette-error-main)" : undefined,
                fontWeight: isOverdue ? 600 : undefined,
              }}
            >
              {row.dueDate ? new Date(row.dueDate).toLocaleDateString("ko-KR") : "-"}
            </span>
          </div>
        );
      }
    }
  },
);

BodyCell.displayName = "BodyCell";
