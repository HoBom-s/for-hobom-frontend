import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AddOutlined, DashboardOutlined } from "@mui/icons-material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useOverlay } from "@/shared/model";
import { ConfirmDialog } from "@/shared/ui";
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
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "#f8f9fa",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DashboardOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="subtitle2" fontWeight={700}>
            보드
          </Typography>
          <Chip
            label={boards.length}
            size="small"
            sx={{
              height: 20,
              minWidth: 20,
              fontSize: 11,
              fontWeight: 700,
              bgcolor: "#4680ff18",
              color: "#4680ff",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* 보드 생성 */}
        <Box sx={{ display: "flex", gap: 1, mb: boards.length > 0 ? 2 : 0 }}>
          <TextField
            size="small"
            placeholder="새 보드 이름"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
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
          </Button>
        </Box>

        {/* 보드 목록 */}
        {boards.length > 0 && (
          <Stack spacing={1.5}>
            {boards.map((board) => (
              <BoardItem
                key={board.id}
                board={board}
                projectId={projectId}
                onDelete={() => handleDelete(board)}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Paper>
  );
};
