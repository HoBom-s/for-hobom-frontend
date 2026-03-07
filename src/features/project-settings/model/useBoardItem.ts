import { useCallback, useState } from "react";
import type { DragEndEvent } from "@/shared/ui";
import {
  useUpdateBoard,
  type BoardColumn,
  type BoardDto,
} from "@/entities/board";
import {
  useUpdateWorkflow,
  buildStatusesFromColumns,
  buildTransitionsFromColumns,
} from "@/entities/project";
import {
  reorderColumns,
  removeColumn,
  addColumn,
  isDuplicateStatusId,
} from "../lib/board-columns.lib";

export const useBoardItem = (board: BoardDto, projectId: string) => {
  const { mutate: updateBoard, isPending: isUpdating } = useUpdateBoard();
  const { mutate: updateWorkflow } = useUpdateWorkflow();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(board.name);
  const [newStatusId, setNewStatusId] = useState("");
  const [newStatusName, setNewStatusName] = useState("");

  const syncColumns = useCallback(
    (columns: BoardColumn[]) => {
      updateBoard({ projectId, boardId: board.id, columns });
      updateWorkflow({
        projectId,
        statuses: buildStatusesFromColumns(columns),
        transitions: buildTransitionsFromColumns(columns),
      });
    },
    [updateBoard, updateWorkflow, projectId, board.id],
  );

  const handleSaveName = () => {
    if (!editName.trim() || editName.trim() === board.name) {
      setIsEditing(false);
      setEditName(board.name);
      return;
    }
    updateBoard(
      { projectId, boardId: board.id, name: editName.trim() },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handleAddColumn = () => {
    const id = newStatusId.trim().toLowerCase();
    const name = newStatusName.trim();
    if (!id || !name) return;
    if (isDuplicateStatusId(board.columns, id)) return;

    syncColumns(addColumn(board.columns, id, name));
    setNewStatusId("");
    setNewStatusName("");
  };

  const handleRemoveColumn = (statusId: string) => {
    syncColumns(removeColumn(board.columns, statusId));
  };

  const handleColumnReorder = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    syncColumns(
      reorderColumns(board.columns, String(active.id), String(over.id)),
    );
  };

  return {
    isEditing,
    setIsEditing,
    editName,
    setEditName,
    newStatusId,
    setNewStatusId,
    newStatusName,
    setNewStatusName,
    isUpdating,
    handleSaveName,
    handleAddColumn,
    handleRemoveColumn,
    handleColumnReorder,
    isDuplicate: isDuplicateStatusId(
      board.columns,
      newStatusId.trim().toLowerCase(),
    ),
  };
};
