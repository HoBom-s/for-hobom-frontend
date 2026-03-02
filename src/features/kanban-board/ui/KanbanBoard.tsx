import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import {
  Sortable,
  arrayMove,
  type DragEndEvent,
  type DragStartEvent,
} from "@/shared/ui";
import type { DragOverEvent } from "@dnd-kit/core";
import {
  IssueCard,
  ISSUE_STATUS_ORDER,
  type IssueStatus,
  type IssueType,
} from "@/entities/issue";
import { useKanbanBoard } from "../model/useKanbanBoard";
import {
  findColumnOfIssue,
  resolveDropTarget,
  type ColumnMap,
} from "../lib/kanban-dnd.lib";
import { KanbanColumn } from "./KanbanColumn";

let nextSeq = 100;

interface KanbanBoardProps {
  projectId: string;
}

export const KanbanBoard = ({ projectId }: KanbanBoardProps) => {
  const { groupedByStatus } = useKanbanBoard(projectId);

  const [columns, setColumnsState] = useState<ColumnMap>(groupedByStatus);
  const columnsRef = useRef(columns);
  const snapshotRef = useRef(columns);
  const [activeId, setActiveId] = useState<string | null>(null);

  const setColumns = useCallback(
    (updater: ColumnMap | ((prev: ColumnMap) => ColumnMap)) => {
      setColumnsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        columnsRef.current = next;
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    setColumns(groupedByStatus);
    snapshotRef.current = groupedByStatus;
  }, [groupedByStatus, setColumns]);

  const activeIssue = useMemo(() => {
    if (!activeId) return null;
    for (const issues of Object.values(columns)) {
      const found = issues.find((i) => i.id.value === activeId);
      if (found) return found;
    }
    return null;
  }, [activeId, columns]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    snapshotRef.current = columnsRef.current;
    setActiveId(String(event.active.id));
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const aId = String(active.id);
      const oId = String(over.id);

      const current = columnsRef.current;
      const fromStatus = findColumnOfIssue(current, aId);
      const toStatus = resolveDropTarget(current, oId);

      if (!fromStatus || !toStatus || fromStatus === toStatus) return;

      setColumns((prev) => {
        const fromItems = [...prev[fromStatus]];
        const toItems = [...prev[toStatus]];

        const fromIdx = fromItems.findIndex((i) => i.id.value === aId);
        if (fromIdx === -1) return prev;

        const [item] = fromItems.splice(fromIdx, 1);
        const overItemIdx = toItems.findIndex((i) => i.id.value === oId);
        const insertIdx = overItemIdx >= 0 ? overItemIdx : toItems.length;

        toItems.splice(insertIdx, 0, { ...item, status: toStatus });

        return { ...prev, [fromStatus]: fromItems, [toStatus]: toItems };
      });
    },
    [setColumns],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) {
        setColumns(snapshotRef.current);
        return;
      }

      const aId = String(active.id);
      const oId = String(over.id);

      const current = columnsRef.current;
      const activeCol = findColumnOfIssue(current, aId);
      const overCol = resolveDropTarget(current, oId);

      if (activeCol && overCol && activeCol === overCol && aId !== oId) {
        setColumns((prev) => {
          const items = [...prev[activeCol]];
          const oldIdx = items.findIndex((i) => i.id.value === aId);
          const newIdx = items.findIndex((i) => i.id.value === oId);
          if (oldIdx === -1 || newIdx === -1) return prev;
          return { ...prev, [activeCol]: arrayMove(items, oldIdx, newIdx) };
        });
      }
    },
    [setColumns],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setColumns(snapshotRef.current);
  }, [setColumns]);

  const handleAddIssue = useCallback(
    (title: string, status: IssueStatus) => {
      const seq = nextSeq++;
      const newIssue: IssueType = {
        id: { value: `temp-${seq}` },
        projectId,
        key: `PROJ-${seq}`,
        title,
        description: "",
        kind: "TASK",
        priority: "MEDIUM",
        status,
        assignee: null,
        reporter: { id: "user-1", name: "나" },
        sprintId: null,
        order: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setColumns((prev) => ({
        ...prev,
        [status]: [...prev[status], newIssue],
      }));
    },
    [projectId, setColumns],
  );

  return (
    <Sortable.Root
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      overlay={
        activeIssue ? (
          <IssueCard issue={activeIssue} isDragOverlay />
        ) : undefined
      }
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          minHeight: 480,
        }}
      >
        {ISSUE_STATUS_ORDER.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            issues={columns[status]}
            onAddIssue={(title) => handleAddIssue(title, status)}
          />
        ))}
      </Box>
    </Sortable.Root>
  );
};
