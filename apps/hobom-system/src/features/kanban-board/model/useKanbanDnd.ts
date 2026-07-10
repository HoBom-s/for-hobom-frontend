import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { arrayMove } from "@/shared/ui";
import type { DragEndEvent, DragStartEvent, DragOverEvent } from "@/shared/ui";
import type { IssueType } from "@/entities/issue";
import { findColumnOfIssue, resolveDropTarget, type ColumnMap } from "../lib/kanban-dnd.lib";

interface UseKanbanDndParams {
  groupedByStatus: ColumnMap;
  transitionIssue: (params: { projectId: string; issueId: string; statusId: string }) => void;
  projectId: string;
}

export const useKanbanDnd = ({
  groupedByStatus,
  transitionIssue,
  projectId,
}: UseKanbanDndParams) => {
  const [columns, setColumnsState] = useState<ColumnMap>(groupedByStatus);
  const columnsRef = useRef(columns);
  const snapshotRef = useRef(columns);
  const [activeId, setActiveId] = useState<string | null>(null);

  const setColumns = useCallback((updater: ColumnMap | ((prev: ColumnMap) => ColumnMap)) => {
    setColumnsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;

      columnsRef.current = next;

      return next;
    });
  }, []);

  useEffect(() => {
    setColumns(groupedByStatus);
    snapshotRef.current = groupedByStatus;
  }, [groupedByStatus, setColumns]);

  const activeIssue = useMemo(() => {
    if (!activeId) return null;
    for (const issues of Object.values(columns)) {
      const found = issues.find((i: IssueType) => i.id === activeId);

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
        const fromItems = [...(prev[fromStatus] ?? [])];
        const toItems = [...(prev[toStatus] ?? [])];

        const fromIdx = fromItems.findIndex((i) => i.id === aId);

        if (fromIdx === -1) return prev;

        const [item] = fromItems.splice(fromIdx, 1);

        if (!item) return prev;

        const overItemIdx = toItems.findIndex((i) => i.id === oId);
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
          const items = [...(prev[activeCol] ?? [])];
          const oldIdx = items.findIndex((i) => i.id === aId);
          const newIdx = items.findIndex((i) => i.id === oId);

          if (oldIdx === -1 || newIdx === -1) return prev;

          return { ...prev, [activeCol]: arrayMove(items, oldIdx, newIdx) };
        });
      }

      const snapshot = snapshotRef.current;
      const originalCol = findColumnOfIssue(snapshot, aId);
      const finalCol = findColumnOfIssue(columnsRef.current, aId);

      if (originalCol && finalCol && originalCol !== finalCol) {
        transitionIssue({
          projectId,
          issueId: aId,
          statusId: finalCol,
        });
      }
    },
    [setColumns, transitionIssue, projectId],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setColumns(snapshotRef.current);
  }, [setColumns]);

  return {
    columns,
    activeIssue,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
};
