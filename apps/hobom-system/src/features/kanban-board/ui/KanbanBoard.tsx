import { useCallback, useMemo } from "react";
import { ViewStreamOutlined } from "hobom-design-system/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  IssueCard,
  getDescendantProgress,
  useCreateIssue,
  useTransitionIssue,
} from "@/entities/issue";
import {
  boardQueries,
  DEFAULT_BOARD_COLUMNS,
  type BoardColumn,
} from "@/entities/board";
import { useProjectContext } from "@/shared/model";
import {
  Hb,
  Sortable,
  type DragEndEvent,
  type DragStartEvent,
} from "@/shared/ui";
import { useKanbanBoard } from "../model/useKanbanBoard";
import { useKanbanDnd } from "../model/useKanbanDnd";
import { useKanbanFilters } from "../model/useKanbanFilters";
import { KanbanContext } from "../model/useKanbanContext";
import { KanbanColumn } from "./KanbanColumn";
import type { DragOverEvent } from "@dnd-kit/core";

interface KanbanBoardProps {
  projectId: string;
  onIssueClick?: (issueId: string) => void;
}

export const KanbanBoard = ({ projectId, onIssueClick }: KanbanBoardProps) => {
  const { doneStatusIds: doneIds } = useProjectContext();
  const { data: boardsData } = useSuspenseQuery(
    boardQueries.listByProject(projectId),
  );
  const boardColumns: BoardColumn[] = useMemo(() => {
    const kanban = boardsData.items.find((b) => b.type === "KANBAN");

    return kanban?.columns?.length ? kanban.columns : DEFAULT_BOARD_COLUMNS;
  }, [boardsData]);

  const columnStatusIds = useMemo(
    () => boardColumns.map((c) => c.statusId),
    [boardColumns],
  );

  const { groupedByStatus, issueTree } = useKanbanBoard(
    projectId,
    columnStatusIds,
  );
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
    [
      projectId,
      issueTree,
      doneIds,
      filters.swimlaneGroups,
      handleAddIssue,
      onIssueClick,
    ],
  );

  return (
    <KanbanContext.Provider value={contextValue}>
      <Sortable.Root
        onDragStart={dnd.handleDragStart as (e: DragStartEvent) => void}
        onDragOver={dnd.handleDragOver as (e: DragOverEvent) => void}
        onDragEnd={dnd.handleDragEnd as (e: DragEndEvent) => void}
        onDragCancel={dnd.handleDragCancel}
        overlay={
          dnd.activeIssue ? (
            <IssueCard
              issue={dnd.activeIssue}
              isDragOverlay
              parentIssueKey={
                issueTree.parentMap.get(dnd.activeIssue.id)?.issueKey
              }
              childCount={
                issueTree.childrenMap.get(dnd.activeIssue.id)?.length ?? 0
              }
              progress={
                (issueTree.childrenMap.get(dnd.activeIssue.id)?.length ?? 0) > 0
                  ? getDescendantProgress(
                      dnd.activeIssue.id,
                      issueTree.childrenMap,
                      doneIds,
                    )
                  : undefined
              }
            />
          ) : undefined
        }
      >
        {/* Toolbar */}
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          {filters.epics.length > 0 && (
            <Hb.Form.Control size="small" sx={{ minWidth: 200 }}>
              <Hb.Form.Label shrink>에픽 필터</Hb.Form.Label>
              <Hb.Form.Select
                value={filters.epicFilter ?? ""}
                label="에픽 필터"
                displayEmpty
                onChange={(e) => filters.setEpicFilter(e.target.value || null)}
              >
                <Hb.Menu.Item value="">전체</Hb.Menu.Item>
                {filters.epics.map((epic) => (
                  <Hb.Menu.Item key={epic.id} value={epic.id}>
                    {epic.issueKey} {epic.title}
                  </Hb.Menu.Item>
                ))}
              </Hb.Form.Select>
            </Hb.Form.Control>
          )}
          <Hb.ToggleButton
            value="swimlane"
            selected={filters.swimlaneEnabled}
            onChange={filters.toggleSwimlane}
            size="small"
            sx={{
              textTransform: "none",
              fontSize: 12,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
            }}
          >
            <ViewStreamOutlined sx={{ fontSize: 16, mr: 0.5 }} />
            에픽 스윔레인
          </Hb.ToggleButton>
        </Hb.Box>

        {/* Columns */}
        <Hb.Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            minHeight: 480,
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
