import { Box, Chip, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { Sortable } from "@/shared/ui";
import {
  IssueCard,
  ISSUE_STATUS_CATEGORY_LABEL,
  getDescendantProgress,
  getRootEpic,
  type IssueStatusCategory,
  type IssueType,
  type IssueTreeResult,
} from "@/entities/issue";
import { columnDroppableId } from "../lib/kanban-dnd.lib";
import type { SwimlaneGroup } from "./KanbanBoard";
import { KanbanSwimlane } from "./KanbanSwimlane";
import { CreateIssueInlineForm } from "./CreateIssueInlineForm";

interface KanbanColumnProps {
  status: IssueStatusCategory;
  issues: IssueType[];
  issueTree: IssueTreeResult;
  swimlaneGroups?: SwimlaneGroup[] | null;
  onAddIssue: (title: string) => void;
  onIssueClick?: (issueId: string) => void;
}

const STATUS_CONFIG: Record<
  IssueStatusCategory,
  { color: string; bg: string }
> = {
  TODO: { color: "#5b6a98", bg: "#eef0f4" },
  IN_PROGRESS: { color: "#4680ff", bg: "#e3f2fd" },
  DONE: { color: "#2ca87f", bg: "#e8f5e9" },
};

export const KanbanColumn = ({
  status,
  issues,
  issueTree,
  swimlaneGroups,
  onAddIssue,
  onIssueClick,
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
          {ISSUE_STATUS_CATEGORY_LABEL[status]}
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

      <Sortable.List items={issues.map((i) => i.id)} strategy="vertical">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flex: 1,
            minHeight: 60,
          }}
        >
          {swimlaneGroups
            ? swimlaneGroups.map((group) => {
                const laneIssues = issues.filter((issue) => {
                  if (group.epicId === null) {
                    const rootEpic = getRootEpic(issue.id, issueTree.parentMap);
                    return !rootEpic && issue.type !== "EPIC";
                  }
                  return (
                    issue.id === group.epicId ||
                    getRootEpic(issue.id, issueTree.parentMap)?.id ===
                      group.epicId
                  );
                });
                if (laneIssues.length === 0) return null;
                return (
                  <KanbanSwimlane
                    key={group.epicId ?? "no-epic"}
                    epicKey={group.epicKey}
                    epicTitle={group.epicTitle}
                    progress={group.progress}
                  >
                    {laneIssues.map((issue) =>
                      renderIssueItem(issue, issueTree, onIssueClick),
                    )}
                  </KanbanSwimlane>
                );
              })
            : issues.map((issue) =>
                renderIssueItem(issue, issueTree, onIssueClick),
              )}
        </Box>
      </Sortable.List>

      <CreateIssueInlineForm onSubmit={onAddIssue} />
    </Box>
  );
};

const renderIssueItem = (
  issue: IssueType,
  issueTree: IssueTreeResult,
  onIssueClick?: (issueId: string) => void,
) => {
  const childCount = issueTree.childrenMap.get(issue.id)?.length ?? 0;
  const progress =
    childCount > 0
      ? getDescendantProgress(issue.id, issueTree.childrenMap)
      : undefined;
  return (
    <Sortable.Item key={issue.id} id={issue.id}>
      <Box
        onClick={() => onIssueClick?.(issue.id)}
        sx={{ cursor: onIssueClick ? "pointer" : undefined }}
      >
        <IssueCard
          issue={issue}
          parentIssueKey={issueTree.parentMap.get(issue.id)?.issueKey}
          childCount={childCount}
          progress={progress}
        />
      </Box>
    </Sortable.Item>
  );
};
