import { Hb, Sortable, useDroppable } from "@/shared/ui";
import { getDescendantProgress, getRootEpic, type IssueType } from "@/entities/issue";
import { IssueCard } from "@/entities/issue/ui";
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
  const { issueTree, doneStatusIds, swimlaneGroups, onAddIssue, onIssueClick } = useKanbanContext();

  const { setNodeRef, isOver } = useDroppable({
    id: columnDroppableId(column.statusId),
  });

  const config = getStatusConfig(column.statusId);

  return (
    <Hb.Box
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
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
          px: 0.5,
        }}
      >
        <Hb.Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: config.color,
            boxShadow: `0 0 0 3px ${config.color}28`,
          }}
        />
        <Hb.Text
          variant="body2"
          fontWeight={700}
          style={{
            letterSpacing: "-0.01em",
          }}
        >
          {column.name}
        </Hb.Text>
        <Hb.Chip
          label={issues.length}
          size="small"
          style={{
            height: 20,
            fontSize: 11,
            fontWeight: 700,
            backgroundColor: config.bg,
            color: config.color,
          }}
        />
      </Hb.Box>
      <Sortable.List items={issues.map((i) => i.id)} strategy="vertical">
        <Hb.Box
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
                    getRootEpic(issue.id, issueTree.parentMap)?.id === group.epicId
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
                      renderIssueItem(issue, issueTree, doneStatusIds, onIssueClick),
                    )}
                  </KanbanSwimlane>
                );
              })
            : issues.map((issue) => renderIssueItem(issue, issueTree, doneStatusIds, onIssueClick))}
        </Hb.Box>
      </Sortable.List>
      <CreateIssueInlineForm onSubmit={onAddIssue} />
    </Hb.Box>
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
      <Hb.Box
        onClick={() => onIssueClick?.(issue.id)}
        sx={{ cursor: onIssueClick ? "pointer" : undefined }}
      >
        <IssueCard
          issue={issue}
          parentIssueKey={issueTree.parentMap.get(issue.id)?.issueKey}
          childCount={childCount}
          progress={progress}
        />
      </Hb.Box>
    </Sortable.Item>
  );
};
