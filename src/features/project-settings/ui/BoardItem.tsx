import {
  Box,
  Chip,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddOutlined,
  CloseOutlined,
  DeleteOutline,
  DragIndicatorOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Sortable } from "@/shared/ui";
import { getStatusConfig, type BoardDto } from "@/entities/board";
import { useBoardItem } from "../model/useBoardItem";

interface BoardItemProps {
  board: BoardDto;
  projectId: string;
  onDelete: () => void;
}

export const BoardItem = ({ board, projectId, onDelete }: BoardItemProps) => {
  const {
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
    isDuplicate,
  } = useBoardItem(board, projectId);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* 보드 헤더 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        {isEditing ? (
          <TextField
            size="small"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveName();
              if (e.key === "Escape") {
                setIsEditing(false);
                setEditName(board.name);
              }
            }}
            onBlur={handleSaveName}
            autoFocus
            disabled={isUpdating}
            sx={{ flex: 1, mr: 1 }}
          />
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              {board.name}
            </Typography>
            <Chip
              label={board.type}
              size="small"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 700,
                bgcolor: "#f0f2f5",
                color: "text.secondary",
              }}
            />
          </Box>
        )}
        <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
          <Tooltip title="이름 수정">
            <IconButton
              size="small"
              onClick={() => setIsEditing(true)}
              sx={{ color: "text.disabled" }}
            >
              <EditOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="삭제">
            <IconButton
              size="small"
              onClick={onDelete}
              sx={{
                color: "text.disabled",
                "&:hover": { color: "error.main" },
              }}
            >
              <DeleteOutline sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* 컬럼 목록 (드래그 정렬) */}
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={600}
        sx={{ mb: 0.5, display: "block" }}
      >
        컬럼
      </Typography>
      <Sortable.Root onDragEnd={handleColumnReorder}>
        <Sortable.List
          items={board.columns.map((c) => c.statusId)}
          strategy="vertical"
        >
          <Stack spacing={0.5}>
            {board.columns.map((col) => {
              const config = getStatusConfig(col.statusId);
              return (
                <Sortable.Item key={col.statusId} id={col.statusId} useHandle>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1.5,
                      bgcolor: "#fafbfc",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Sortable.Handle>
                      <DragIndicatorOutlined
                        sx={{
                          fontSize: 16,
                          color: "text.disabled",
                          cursor: "grab",
                        }}
                      />
                    </Sortable.Handle>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: config.color,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" sx={{ flex: 1, fontSize: 13 }}>
                      {col.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ fontSize: 11 }}
                    >
                      {col.statusId}
                    </Typography>
                    {col.wipLimit != null && (
                      <Chip
                        label={`WIP ${col.wipLimit}`}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: 10,
                          fontWeight: 600,
                          bgcolor: "#f0f2f5",
                        }}
                      />
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveColumn(col.statusId)}
                      sx={{
                        p: 0.25,
                        color: "text.disabled",
                        "&:hover": { color: "error.main" },
                      }}
                    >
                      <CloseOutlined sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </Sortable.Item>
              );
            })}
          </Stack>
        </Sortable.List>
      </Sortable.Root>

      {/* 컬럼 추가 */}
      <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
        <TextField
          size="small"
          placeholder="status ID"
          value={newStatusId}
          onChange={(e) => setNewStatusId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
          sx={{
            flex: 1,
            "& .MuiInputBase-input": { fontSize: 13, py: 0.75 },
          }}
        />
        <TextField
          size="small"
          placeholder="표시 이름"
          value={newStatusName}
          onChange={(e) => setNewStatusName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
          sx={{
            flex: 1,
            "& .MuiInputBase-input": { fontSize: 13, py: 0.75 },
          }}
        />
        <IconButton
          size="small"
          onClick={handleAddColumn}
          disabled={!newStatusId.trim() || !newStatusName.trim() || isDuplicate}
          color="primary"
          sx={{ borderRadius: 1.5 }}
        >
          <AddOutlined sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
