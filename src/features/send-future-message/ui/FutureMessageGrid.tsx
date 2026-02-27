import { useEffect, useRef, useState } from "react";
import { Grid, useClientRowModel, useColumnResize } from "@hobom-grid/react";
import {
  isPendingMessageSendStatus,
  useUpdateFutureMessage,
  useDeleteFutureMessage,
  type FutureMessageType,
} from "@/entities/future-message";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  EditOutlined,
  DeleteOutlined,
  MailOutline,
} from "@mui/icons-material";

const HEADER_ROW_COUNT = 1;
const MIN_COL_WIDTH = 60;
const ROW_NUM_WIDTH = 52;

const COLUMNS = [
  { key: "rowNum" as const, label: "#" },
  { key: "title" as const, label: "제목 / 내용" },
  { key: "scheduledAt" as const, label: "발송 시간" },
  { key: "sendStatus" as const, label: "상태" },
  { key: "actions" as const, label: "" },
];

type ColKey = (typeof COLUMNS)[number]["key"];

const HEADER_BG = "#f8f9fb";
const HEADER_TEXT = "#6b7280";
const ROW_EVEN = "#ffffff";
const ROW_ODD = "#fafbfc";
const BORDER_COLOR = "#f0f2f5";
const ACTIONS_WIDTH = 80;

const formatDate = (raw: string) => {
  try {
    const date = new Date(raw);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } catch {
    return raw;
  }
};

const formatTime = (raw: string) => {
  try {
    const date = new Date(raw);
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "";
  }
};

const EditDialog = ({
  message,
  open,
  onClose,
}: {
  message: FutureMessageType;
  open: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState(message.title);
  const [content, setContent] = useState(message.content);
  const { mutate, isPending } = useUpdateFutureMessage();

  const handleSubmit = () => {
    if (!title.trim()) return;
    mutate(
      { id: message.id, title: title.trim(), content: content.trim() },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>메시지 수정</DialogTitle>
      <DialogContent sx={{ pt: "12px !important" }}>
        <TextField
          fullWidth
          autoFocus
          label="제목"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="내용"
          size="small"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button fullWidth variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          fullWidth
          variant="contained"
          loading={isPending}
          onClick={handleSubmit}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RowActions = ({
  row,
  onEdit,
  onDelete,
}: {
  row: FutureMessageType;
  onEdit: (message: FutureMessageType) => void;
  onDelete: (id: string) => void;
}) => {
  const isPending = isPendingMessageSendStatus(row.sendStatus);

  if (!isPending) return null;

  return (
    <div
      style={{ display: "flex", gap: 2 }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <IconButton
        size="small"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
          onEdit(row);
        }}
        sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
      >
        <EditOutlined sx={{ fontSize: 16 }} />
      </IconButton>
      <IconButton
        size="small"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
          onDelete(row.id);
        }}
        sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
      >
        <DeleteOutlined sx={{ fontSize: 16 }} />
      </IconButton>
    </div>
  );
};

export const FutureMessageGrid = ({
  messages,
}: {
  messages: FutureMessageType[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [editingMessage, setEditingMessage] =
    useState<FutureMessageType | null>(null);
  const { mutate: mutateDelete } = useDeleteFutureMessage();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (messages.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 10,
          gap: 1.5,
        }}
      >
        <MailOutline sx={{ fontSize: 64, color: "#dadce0" }} />
        <Typography
          variant="body1"
          sx={{ color: "text.disabled", fontSize: "0.95rem" }}
        >
          메시지가 없어요
        </Typography>
      </Box>
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {containerWidth > 0 && (
        <GridInner
          messages={messages}
          containerWidth={containerWidth}
          onEdit={setEditingMessage}
          onDelete={(id) => mutateDelete({ id })}
        />
      )}
      {editingMessage && (
        <EditDialog
          message={editingMessage}
          open={true}
          onClose={() => setEditingMessage(null)}
        />
      )}
    </div>
  );
};

const GridInner = ({
  messages,
  containerWidth,
  onEdit,
  onDelete,
}: {
  messages: FutureMessageType[];
  containerWidth: number;
  onEdit: (message: FutureMessageType) => void;
  onDelete: (id: string) => void;
}) => {
  const rowModel = useClientRowModel(messages, { getId: (r) => r.id });

  const remaining = containerWidth - ROW_NUM_WIDTH - ACTIONS_WIDTH;
  const initialWidths: Record<number, number> = {
    0: ROW_NUM_WIDTH,
    1: Math.floor(remaining * 0.45),
    2: Math.floor(remaining * 0.3),
    3: Math.floor(remaining * 0.25),
    4: ACTIONS_WIDTH,
  };

  const colResize = useColumnResize(initialWidths, MIN_COL_WIDTH);

  return (
    <Grid
      rowCount={rowModel.rowCount}
      colCount={COLUMNS.length}
      defaultRowHeight={60}
      defaultColWidth={Math.floor(containerWidth / COLUMNS.length)}
      colSizes={colResize.colWidths}
      headerRowCount={HEADER_ROW_COUNT}
      renderCell={(cell) => {
        if (cell.kind === "header") {
          const col = COLUMNS[cell.colIndex];
          return (
            <div
              style={{
                position: "relative",
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: col.key === "rowNum" ? "0 0 0 16px" : "0 16px",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: HEADER_TEXT,
                backgroundColor: HEADER_BG,
                borderBottom: "2px solid #e9ecef",
                boxSizing: "border-box",
                userSelect: "none",
              }}
            >
              <span>{col.label}</span>
              {col.key !== "actions" && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "20%",
                    bottom: "20%",
                    width: 4,
                    cursor: "col-resize",
                    borderRadius: 2,
                    backgroundColor: "transparent",
                    transition: "background-color 0.15s",
                  }}
                  onPointerEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      "#4680ff";
                  }}
                  onPointerLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      "transparent";
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    colResize.startResize(cell.colIndex, e);
                  }}
                />
              )}
            </div>
          );
        }

        const bodyIndex = cell.rowIndex - HEADER_ROW_COUNT;
        const row = rowModel.getRow(bodyIndex);
        const colKey: ColKey = COLUMNS[cell.colIndex].key;
        const bg = bodyIndex % 2 === 0 ? ROW_EVEN : ROW_ODD;
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
              borderBottom: `1px solid ${BORDER_COLOR}`,
              boxSizing: "border-box",
              justifyContent: colKey === "actions" ? "center" : "flex-start",
            }}
          >
            {colKey === "rowNum" ? (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#c9d3e0",
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
                    color: "#2d3748",
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
                    color: "#a0aec0",
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
                    color: "#374151",
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatDate(row.scheduledAt)}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#a0aec0",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatTime(row.scheduledAt)}
                </span>
              </div>
            ) : colKey === "actions" ? (
              <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
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
                  backgroundColor: isPending ? "#fff3e0" : "#e8f5e9",
                  color: isPending ? "#e65100" : "#2e7d32",
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
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
