import { useState } from "react";
import { AddOutlined, DashboardOutlined } from "hobom-design-system/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useOverlay } from "@/shared/model";
import { Hb, ConfirmDialog } from "@/shared/ui";
import {
  boardQueries,
  useCreateBoard,
  useDeleteBoard,
  type BoardDto,
} from "@/entities/board";
import { BoardItem } from "./BoardItem";

interface BoardSettingsSectionProps {
  projectId: string;
}

export const BoardSettingsSection = ({
  projectId,
}: BoardSettingsSectionProps) => {
  const { data } = useSuspenseQuery(boardQueries.listByProject(projectId));
  const boards = data.items;

  const { mutate: createBoard, isPending: isCreating } = useCreateBoard();
  const { mutate: deleteBoard } = useDeleteBoard();
  const { onOpen } = useOverlay();

  const [newBoardName, setNewBoardName] = useState("");

  const handleCreate = () => {
    if (!newBoardName.trim()) return;
    createBoard(
      { projectId, name: newBoardName.trim(), type: "KANBAN" },
      { onSuccess: () => setNewBoardName("") },
    );
  };

  const handleDelete = (board: BoardDto) => {
    onOpen(({ isOpen, onClose }) => (
      <ConfirmDialog
        open={isOpen}
        onClose={onClose}
        title="보드 삭제"
        description={
          <>
            <strong>"{board.name}"</strong> 보드를 삭제하시겠어요?
          </>
        }
        confirmLabel="삭제"
        confirmColor="error"
        onConfirm={() => {
          deleteBoard(
            { projectId, boardId: board.id },
            { onSuccess: () => onClose() },
          );
        }}
      />
    ));
  };

  return (
    <Hb.Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Hb.Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "action.hover",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DashboardOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
          <Hb.Text variant="subtitle2" fontWeight={700}>
            보드
          </Hb.Text>
          <Hb.Chip
            label={boards.length}
            size="small"
            sx={{
              height: 20,
              minWidth: 20,
              fontSize: 11,
              fontWeight: 700,
              bgcolor: "rgba(var(--mui-palette-primary-mainChannel) / 0.1)",
              color: "primary.main",
            }}
          />
        </Hb.Box>
      </Hb.Box>

      <Hb.Box sx={{ p: 3 }}>
        {/* 보드 생성 */}
        <Hb.Box sx={{ display: "flex", gap: 1, mb: boards.length > 0 ? 2 : 0 }}>
          <Hb.TextField
            size="small"
            placeholder="새 보드 이름"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            sx={{ flex: 1 }}
          />
          <Hb.Button
            variant="primary"
            size="small"
            startIcon={<AddOutlined />}
            onClick={handleCreate}
            disabled={!newBoardName.trim()}
            loading={isCreating}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              borderRadius: 2,
              flexShrink: 0,
            }}
          >
            생성
          </Hb.Button>
        </Hb.Box>

        {/* 보드 목록 */}
        {boards.length > 0 && (
          <Hb.Stack spacing={1.5}>
            {boards.map((board) => (
              <BoardItem
                key={board.id}
                board={board}
                projectId={projectId}
                onDelete={() => handleDelete(board)}
              />
            ))}
          </Hb.Stack>
        )}
      </Hb.Box>
    </Hb.Paper>
  );
};
