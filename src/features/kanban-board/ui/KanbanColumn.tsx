import { Box, Chip, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { Sortable } from "@/shared/ui";
import {
  IssueCard,
  ISSUE_STATUS_LABEL,
  type IssueStatus,
  type IssueType,
} from "@/entities/issue";
import { columnDroppableId } from "../lib/kanban-dnd.lib";
import { CreateIssueInlineForm } from "./CreateIssueInlineForm";

interface KanbanColumnProps {
  status: IssueStatus;
  issues: IssueType[];
  onAddIssue: (title: string) => void;
}

const STATUS_CONFIG: Record<IssueStatus, { color: string; bg: string }> = {
  TODO: { color: "#5b6a98", bg: "#eef0f4" },
  IN_PROGRESS: { color: "#4680ff", bg: "#e3f2fd" },
  IN_REVIEW: { color: "#e58a00", bg: "#fff8e1" },
  DONE: { color: "#2ca87f", bg: "#e8f5e9" },
};

export const KanbanColumn = ({
  status,
  issues,
  onAddIssue,
}: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnDroppableId(status),
  });

  const config = STATUS_CONFIG[status];

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: "0 0 296px",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        bgcolor: isOver ? config.bg : "#fafbfc",
        borderRadius: 3,
        border: "1px solid",
        borderColor: isOver ? config.color : "transparent",
        p: 1.5,
        transition: "all 0.2s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
          px: 0.5,
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: config.color,
            boxShadow: `0 0 0 3px ${config.bg}`,
          }}
        />
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{ letterSpacing: "-0.01em" }}
        >
          {ISSUE_STATUS_LABEL[status]}
        </Typography>
        <Chip
          label={issues.length}
          size="small"
          sx={{
            height: 20,
            fontSize: 11,
            fontWeight: 700,
            bgcolor: config.bg,
            color: config.color,
            "& .MuiChip-label": { px: 0.75 },
          }}
        />
      </Box>

      <Sortable.List items={issues.map((i) => i.id.value)} strategy="vertical">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flex: 1,
            minHeight: 60,
          }}
        >
          {issues.map((issue) => (
            <Sortable.Item key={issue.id.value} id={issue.id.value}>
              <IssueCard issue={issue} />
            </Sortable.Item>
          ))}
        </Box>
      </Sortable.List>

      <CreateIssueInlineForm onSubmit={onAddIssue} />
    </Box>
  );
};
