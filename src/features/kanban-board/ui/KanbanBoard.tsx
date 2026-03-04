import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
} from "@mui/material";
import { ViewStreamOutlined } from "@mui/icons-material";
import {
  Sortable,
  arrayMove,
  type DragEndEvent,
  type DragStartEvent,
} from "@/shared/ui";
import type { DragOverEvent } from "@dnd-kit/core";
import {
  IssueCard,
  ISSUE_STATUS_CATEGORY_ORDER,
  STATUS_CATEGORY_TO_ID,
  isDescendantOf,
  getDescendantProgress,
  getRootEpic,
  useCreateIssue,
  useTransitionIssue,
  type IssueStatusCategory,
  type DescendantProgress,
} from "@/entities/issue";
import { useKanbanBoard } from "../model/useKanbanBoard";
import {
  findColumnOfIssue,
  resolveDropTarget,
  type ColumnMap,
} from "../lib/kanban-dnd.lib";
import { KanbanColumn } from "./KanbanColumn";

export interface SwimlaneGroup {
  epicId: string | null;
  epicKey: string | null;
  epicTitle: string;
  progress?: DescendantProgress;
}

interface KanbanBoardProps {
  projectId: string;
  onIssueClick?: (issueId: string) => void;
}

export const KanbanBoard = ({ projectId, onIssueClick }: KanbanBoardProps) => {
  const { groupedByStatus, issueTree } = useKanbanBoard(projectId);
  const { mutate: createIssue } = useCreateIssue();
  const { mutate: transitionIssue } = useTransitionIssue(projectId);

  const [epicFilter, setEpicFilter] = useState<string | null>(null);
  const [swimlaneEnabled, setSwimlaneEnabled] = useState(false);

  const epics = useMemo(
    () =>
      Object.values(groupedByStatus)
        .flat()
        .filter((i) => i.type === "EPIC"),
    [groupedByStatus],
  );

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
      const found = issues.find((i) => i.id === activeId);
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

        const fromIdx = fromItems.findIndex((i) => i.id === aId);
        if (fromIdx === -1) return prev;

        const [item] = fromItems.splice(fromIdx, 1);
        const overItemIdx = toItems.findIndex((i) => i.id === oId);
        const insertIdx = overItemIdx >= 0 ? overItemIdx : toItems.length;

        toItems.splice(insertIdx, 0, {
          ...item,
          statusCategory: toStatus,
        });

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
          const oldIdx = items.findIndex((i) => i.id === aId);
          const newIdx = items.findIndex((i) => i.id === oId);
          if (oldIdx === -1 || newIdx === -1) return prev;
          return { ...prev, [activeCol]: arrayMove(items, oldIdx, newIdx) };
        });
      }

      // 크로스-컬럼 이동 시 상태 전환 API 호출
      const snapshot = snapshotRef.current;
      const originalCol = findColumnOfIssue(snapshot, aId);
      const finalCol = findColumnOfIssue(columnsRef.current, aId);

      if (originalCol && finalCol && originalCol !== finalCol) {
        transitionIssue({
          projectId,
          issueId: aId,
          statusId: STATUS_CATEGORY_TO_ID[finalCol],
        });
      }
    },
    [setColumns, transitionIssue, projectId],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setColumns(snapshotRef.current);
  }, [setColumns]);

  const filteredColumns = useMemo(() => {
    if (!epicFilter) return columns;
    const filtered = {} as ColumnMap;
    for (const [status, issues] of Object.entries(columns)) {
      filtered[status as IssueStatusCategory] = issues.filter(
        (issue) =>
          issue.id === epicFilter ||
          isDescendantOf(issue.id, epicFilter, issueTree.parentMap),
      );
    }
    return filtered;
  }, [columns, epicFilter, issueTree.parentMap]);

  const swimlaneGroups = useMemo(() => {
    if (!swimlaneEnabled) return null;

    const epicMap = new Map<string | null, SwimlaneGroup>();
    const allIssues = Object.values(groupedByStatus).flat();

    for (const issue of allIssues) {
      const rootEpic = getRootEpic(issue.id, issueTree.parentMap);
      const epicId = rootEpic?.id ?? (issue.type === "EPIC" ? issue.id : null);

      if (!epicMap.has(epicId)) {
        if (epicId) {
          const epic = allIssues.find((i) => i.id === epicId);
          epicMap.set(epicId, {
            epicId,
            epicKey: epic?.issueKey ?? null,
            epicTitle: epic?.title ?? "",
            progress: getDescendantProgress(epicId, issueTree.childrenMap),
          });
        } else {
          epicMap.set(null, {
            epicId: null,
            epicKey: null,
            epicTitle: "에픽 없음",
          });
        }
      }
    }

    return [...epicMap.values()].sort((a, b) => {
      if (a.epicId === null) return 1;
      if (b.epicId === null) return -1;
      return (a.epicKey ?? "").localeCompare(b.epicKey ?? "");
    });
  }, [swimlaneEnabled, groupedByStatus, issueTree]);

  const handleAddIssue = useCallback(
    (title: string, status: IssueStatusCategory) => {
      createIssue({
        projectId,
        title,
        type: "TASK",
        priority: status === "TODO" ? undefined : undefined,
      });
    },
    [projectId, createIssue],
  );

  return (
    <Sortable.Root
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      overlay={
        activeIssue ? (
          <IssueCard
            issue={activeIssue}
            isDragOverlay
            parentIssueKey={issueTree.parentMap.get(activeIssue.id)?.issueKey}
            childCount={issueTree.childrenMap.get(activeIssue.id)?.length ?? 0}
            progress={
              (issueTree.childrenMap.get(activeIssue.id)?.length ?? 0) > 0
                ? getDescendantProgress(activeIssue.id, issueTree.childrenMap)
                : undefined
            }
          />
        ) : undefined
      }
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        {epics.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel shrink>에픽 필터</InputLabel>
            <Select
              value={epicFilter ?? ""}
              label="에픽 필터"
              displayEmpty
              onChange={(e) => setEpicFilter(e.target.value || null)}
            >
              <MenuItem value="">전체</MenuItem>
              {epics.map((epic) => (
                <MenuItem key={epic.id} value={epic.id}>
                  {epic.issueKey} {epic.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <ToggleButton
          value="swimlane"
          selected={swimlaneEnabled}
          onChange={() => setSwimlaneEnabled((v) => !v)}
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
        </ToggleButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          minHeight: 480,
        }}
      >
        {ISSUE_STATUS_CATEGORY_ORDER.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            issues={filteredColumns[status]}
            issueTree={issueTree}
            swimlaneGroups={swimlaneGroups}
            onAddIssue={(title) => handleAddIssue(title, status)}
            onIssueClick={onIssueClick}
          />
        ))}
      </Box>
    </Sortable.Root>
  );
};
