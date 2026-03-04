import { Avatar, Chip } from "@mui/material";
import {
  ISSUE_PRIORITY_LABEL,
  ISSUE_STATUS_CATEGORY_LABEL,
  type IssueType,
} from "@/entities/issue";
import {
  type ColKey,
  KIND_ICON,
  STATUS_CHIP_COLOR,
  PRIORITY_COLOR,
  BORDER_COLOR,
} from "./issue-list-constants";

interface BodyCellProps {
  colKey: ColKey;
  row: IssueType;
  bg: string;
  onStatusClick: (
    e: React.MouseEvent<HTMLElement>,
    issueId: string,
    currentStatus: string,
  ) => void;
  onRowClick?: (issueId: string) => void;
}

export const BodyCell = ({
  colKey,
  row,
  bg,
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

  switch (colKey) {
    case "issueKey":
      return (
        <div style={baseCellStyle} onClick={handleRowClick}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#9ca3af",
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
          {KIND_ICON[row.type]}
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

    case "statusCategory":
      return (
        <div
          style={baseCellStyle}
          onClick={handleRowClick}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Chip
            label={ISSUE_STATUS_CATEGORY_LABEL[row.statusCategory]}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onStatusClick(e, row.id, row.status);
            }}
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 600,
              bgcolor: `${STATUS_CHIP_COLOR[row.statusCategory]}18`,
              color: STATUS_CHIP_COLOR[row.statusCategory],
              cursor: "pointer",
              "&:hover": {
                bgcolor: `${STATUS_CHIP_COLOR[row.statusCategory]}28`,
              },
            }}
          />
        </div>
      );

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
              bgcolor: `${PRIORITY_COLOR[row.priority]}18`,
              color: PRIORITY_COLOR[row.priority],
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
                bgcolor: "#e8eaed",
                color: "#5f6368",
              }}
            >
              {row.assignee.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <span style={{ fontSize: 12, color: "#d1d5db" }}>-</span>
          )}
        </div>
      );
  }
};
