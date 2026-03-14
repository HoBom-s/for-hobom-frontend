import { arrayMove } from "@/shared/ui";
import type { BoardColumn } from "@/entities/board";

const reindex = (columns: BoardColumn[]): BoardColumn[] =>
  columns.map((c, i) => ({ ...c, order: i }));

export const reorderColumns = (
  columns: BoardColumn[],
  activeId: string,
  overId: string,
): BoardColumn[] => {
  const oldIdx = columns.findIndex((c) => c.statusId === activeId);
  const newIdx = columns.findIndex((c) => c.statusId === overId);

  if (oldIdx === -1 || newIdx === -1) return columns;

  return reindex(arrayMove(columns, oldIdx, newIdx));
};

export const removeColumn = (columns: BoardColumn[], statusId: string): BoardColumn[] =>
  reindex(columns.filter((c) => c.statusId !== statusId));

export const addColumn = (
  columns: BoardColumn[],
  statusId: string,
  name: string,
): BoardColumn[] => [...columns, { statusId, name, wipLimit: null, order: columns.length }];

export const isDuplicateStatusId = (columns: BoardColumn[], statusId: string): boolean =>
  columns.some((c) => c.statusId === statusId);
