import { useCallback, useMemo } from "react";
import { ViewStreamOutlined } from "hobom-design-system/icons";
import { useSuspenseQuery } from "hobom-data";
import { getDescendantProgress, useCreateIssue, useTransitionIssue } from "@/entities/issue";
import { IssueCard } from "@/entities/issue/ui";
import { boardQueries, DEFAULT_BOARD_COLUMNS, type BoardColumn } from "@/entities/board";
import { useProjectContext } from "@/entities/project";
import { Hb, Sortable } from "@/shared/ui";
import { useKanbanBoard } from "../model/useKanbanBoard";
import { useKanbanDnd } from "../model/useKanbanDnd";
import { useKanbanFilters } from "../model/useKanbanFilters";
import { KanbanContext } from "../model/useKanbanContext";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
  projectId: string;
  onIssueClick?: (issueId: string) => void;
}

export const KanbanBoard = ({ projectId, onIssueClick }: KanbanBoardProps) => {
  const { doneStatusIds: doneIds } = useProjectContext();
  const { data: boardsData } = useSuspenseQuery(boardQueries.listByProject(projectId));
  const boardColumns: BoardColumn[] = useMemo(() => {
    const kanban = boardsData.items.find((b) => b.type === "KANBAN");

    return kanban?.columns?.length ? kanban.columns : DEFAULT_BOARD_COLUMNS;
  }, [boardsData]);

  const columnStatusIds = useMemo(() => boardColumns.map((c) => c.statusId), [boardColumns]);

  const { groupedByStatus, issueTree } = useKanbanBoard(projectId, columnStatusIds);
  const { mutate: createIssue } = useCreateIssue();
  const { mutate: transitionIssue } = useTransitionIssue(projectId);

  const dnd = useKanbanDnd({ groupedByStatus, transitionIssue, projectId });
  const filters = useKanbanFilters({
    columns: dnd.columns,
    issueTree,
    doneStatusIds: doneIds,
    groupedByStatus,
  });

  const handleAddIssue = useCallback(
    (title: string) => {
      createIssue({ projectId, title, type: "TASK" });
    },
    [projectId, createIssue],
  );

  const contextValue = useMemo(
    () => ({
      projectId,
      issueTree,
      doneStatusIds: doneIds,
      swimlaneGroups: filters.swimlaneGroups,
      onAddIssue: handleAddIssue,
      onIssueClick,
    }),
    [projectId, issueTree, doneIds, filters.swimlaneGroups, handleAddIssue, onIssueClick],
  );

  return (
    <KanbanContext.Provider value={contextValue}>
      <Sortable.Root
        onDragStart={dnd.handleDragStart}
        onDragOver={dnd.handleDragOver}
        onDragEnd={dnd.handleDragEnd}
        onDragCancel={dnd.handleDragCancel}
        overlay={
          dnd.activeIssue ? (
            <IssueCard
              issue={dnd.activeIssue}
              isDragOverlay
              parentIssueKey={issueTree.parentMap.get(dnd.activeIssue.id)?.issueKey}
              childCount={issueTree.childrenMap.get(dnd.activeIssue.id)?.length ?? 0}
              progress={
                (issueTree.childrenMap.get(dnd.activeIssue.id)?.length ?? 0) > 0
                  ? getDescendantProgress(dnd.activeIssue.id, issueTree.childrenMap, doneIds)
                  : undefined
              }
            />
          ) : undefined
        }
      >
        {/* Toolbar */}
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {filters.epics.length > 0 && (
            <Hb.Form.Control size="small" style={{
              minWidth: 200
            }}>
              <Hb.Form.Label shrink>에픽 필터</Hb.Form.Label>
              <Hb.Form.Select
                value={filters.epicFilter ?? ""}
                label="에픽 필터"
                displayEmpty
                onChange={(e) => filters.setEpicFilter(e.target.value || null)}
              >
                <Hb.Form.Option value="">전체</Hb.Form.Option>
                {filters.epics.map((epic) => (
                  <Hb.Form.Option key={epic.id} value={epic.id}>
                    {epic.issueKey} {epic.title}
                  </Hb.Form.Option>
                ))}
              </Hb.Form.Select>
            </Hb.Form.Control>
          )}
          <Hb.ToggleButton
            value="swimlane"
            selected={filters.swimlaneEnabled}
            onChange={filters.toggleSwimlane}
            size="small"
            style={{
              textTransform: "none",
              fontSize: 12,
              paddingInline: 12,
              paddingBlock: 4,
              borderRadius: 16,
            }}
          >
            <ViewStreamOutlined sx={{ fontSize: 16, mr: 0.5 }} />
            에픽 스윔레인
          </Hb.ToggleButton>
        </Hb.Box>

        {/* Columns — fixed viewport-bounded height so each column stays a
            uniform grid box and scrolls its issues internally instead of
            growing with the issue count. The offset accounts for the app bar
            and the project/board chrome stacked above this region. */}
        <Hb.Box
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: 8,
            height: "calc(100vh - 300px)",
            minHeight: 360,
          }}
        >
          {boardColumns.map((col) => (
            <KanbanColumn
              key={col.statusId}
              column={col}
              issues={filters.filteredColumns[col.statusId] ?? []}
            />
          ))}
        </Hb.Box>
      </Sortable.Root>
    </KanbanContext.Provider>
  );
};
