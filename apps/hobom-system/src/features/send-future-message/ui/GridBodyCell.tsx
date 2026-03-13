import {
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
} from "hobom-design-system/icons";
import {
  isPendingMessageSendStatus,
  type FutureMessageType,
} from "@/entities/future-message";
import { COLORS, type ColKey } from "../config/future-message-grid.config";
import { formatDate, formatTime } from "../lib/future-message-format.lib";
import { FutureMessageRowActions } from "./FutureMessageRowActions";

interface Props {
  colKey: ColKey;
  row: FutureMessageType;
  bodyIndex: number;
  onEdit: (message: FutureMessageType) => void;
  onDelete: (id: string) => void;
}

export const GridBodyCell = ({
  colKey,
  row,
  bodyIndex,
  onEdit,
  onDelete,
}: Props) => {
  const bg = bodyIndex % 2 === 0 ? COLORS.rowEven : COLORS.rowOdd;
  const isPending = isPendingMessageSendStatus(row.sendStatus);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding:
          colKey === "rowNum"
            ? "0 0 0 16px"
            : colKey === "actions"
              ? "0 8px"
              : "0 16px",
        backgroundColor: bg,
        borderBottom: `1px solid ${COLORS.border}`,
        boxSizing: "border-box",
        justifyContent: colKey === "actions" ? "center" : "flex-start",
      }}
    >
      {colKey === "rowNum" ? (
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: COLORS.rowNum,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(bodyIndex + 1).padStart(2, "0")}
        </span>
      ) : colKey === "title" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: 600,
              fontSize: 13,
              color: COLORS.titleText,
            }}
          >
            {String(row.title ?? "")}
          </span>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 11,
              color: COLORS.subtitleText,
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {String(row.content ?? "")}
          </span>
        </div>
      ) : colKey === "scheduledAt" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: COLORS.dateText,
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatDate(row.scheduledAt)}
          </span>
          <span
            style={{
              fontSize: 11,
              color: COLORS.subtitleText,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatTime(row.scheduledAt)}
          </span>
        </div>
      ) : colKey === "actions" ? (
        <FutureMessageRowActions
          row={row}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            backgroundColor: isPending ? COLORS.pendingBg : COLORS.sentBg,
            color: isPending ? COLORS.pendingText : COLORS.sentText,
            whiteSpace: "nowrap",
          }}
        >
          {isPending ? (
            <ScheduleIcon style={{ fontSize: 13 }} />
          ) : (
            <CheckCircleIcon style={{ fontSize: 13 }} />
          )}
          {isPending ? "발송 대기" : "발송 완료"}
        </span>
      )}
    </div>
  );
};
