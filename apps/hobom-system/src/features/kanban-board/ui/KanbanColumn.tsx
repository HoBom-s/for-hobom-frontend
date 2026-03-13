import { Box, Chip, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { Sortable } from "@/shared/ui";
import {
  IssueCard,
  getDescendantProgress,
  getRootEpic,
  type IssueType,
} from "@/entities/issue";
import { getStatusConfig, type BoardColumn } from "@/entities/board";
import { columnDroppableId } from "../lib/kanban-dnd.lib";
import { useKanbanContext } from "../model/useKanbanContext";
import { KanbanSwimlane } from "./KanbanSwimlane";
import { CreateIssueInlineForm } from "./CreateIssueInlineForm";

interface KanbanColumnProps {
  column: BoardColumn;
  issues: IssueType[];
}

export const KanbanColumn = ({ column, issues }: KanbanColumnProps) => {
  const { issueTree, doneStatusIds, swimlaneGroups, onAddIssue, onIssueClick } =
    useKanbanContext();

  const { setNodeRef, isOver } = useDroppable({
    id: columnDroppableId(column.statusId),
  });

  const config = getStatusConfig(column.statusId);

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: "0 0 296px",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        bgcolor: isOver ? `${config.color}14` : "action.hover",
        borderRadius: 2,
        border: "1px solid",
        borderColor: isOver ? config.color : "divider",
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
            boxShadow: `0 0 0 3px ${config.color}28`,
          }}
        />
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{ letterSpacing: "-0.01em" }}
        >
          {column.name}
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
                      renderIssueItem(
                        issue,
                        issueTree,
                        doneStatusIds,
                        onIssueClick,
                      ),
                    )}
                  </KanbanSwimlane>
                );
              })
            : issues.map((issue) =>
                renderIssueItem(issue, issueTree, doneStatusIds, onIssueClick),
              )}
        </Box>
      </Sortable.List>

      <CreateIssueInlineForm onSubmit={onAddIssue} />
    </Box>
  );
};

const renderIssueItem = (
  issue: IssueType,
  issueTree: {
    parentMap: Map<string, IssueType>;
    childrenMap: Map<string, IssueType[]>;
  },
  doneStatusIds: Set<string>,
  onIssueClick?: (issueId: string) => void,
) => {
  const childCount = issueTree.childrenMap.get(issue.id)?.length ?? 0;
  const progress =
    childCount > 0
      ? getDescendantProgress(issue.id, issueTree.childrenMap, doneStatusIds)
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
