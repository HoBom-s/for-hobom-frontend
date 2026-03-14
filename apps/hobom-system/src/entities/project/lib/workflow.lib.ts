import { Bom } from "hobom-utils";
import type { WorkflowStatus, WorkflowTransition } from "../api/workflow.type";

/** 보드 컬럼에서 WorkflowStatus[] 빌드 (workflow가 null일 때 fallback) */
export const buildStatusesFromColumns = (
  columns: { statusId: string; name: string; order: number }[],
): WorkflowStatus[] =>
  columns.map((col, i, arr) => ({
    id: col.statusId,
    name: col.name,
    isDone: i === arr.length - 1,
    order: col.order,
  }));

/** 보드 컬럼에서 전체 WorkflowTransition[] 생성 (any → any) */
export const buildTransitionsFromColumns = (
  columns: { statusId: string; name: string }[],
): WorkflowTransition[] => {
  const transitions: WorkflowTransition[] = [];

  for (const from of columns) {
    for (const to of columns) {
      if (from.statusId !== to.statusId) {
        transitions.push({
          from: from.statusId,
          to: to.statusId,
          name: to.name,
        });
      }
    }
  }

  return transitions;
};

export const getStatusName = (statuses: WorkflowStatus[], statusId: string): string =>
  statuses.find((s) => s.id === statusId)?.name ?? statusId;

export const getStatusColor = (statuses: WorkflowStatus[], statusId: string): string => {
  const status = statuses.find((s) => s.id === statusId);

  if (!status) return "#6b7280";
  if (status.isDone) return "#2ca87f";
  if (status.order === 0) return "#5b6a98";

  return "#4680ff";
};

export const getAvailableTransitions = (
  transitions: WorkflowTransition[],
  statusId: string,
): WorkflowTransition[] => transitions.filter((t) => t.from === statusId);

export const getDoneStatusIds = (statuses: WorkflowStatus[]): Set<string> =>
  new Set(
    Bom.pipe(
      statuses,
      Bom.filter((s) => s.isDone),
      Bom.map((s) => s.id),
    ),
  );
