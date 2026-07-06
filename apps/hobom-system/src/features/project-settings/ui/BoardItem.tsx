import {
  AddOutlined,
  CloseOutlined,
  DeleteOutline,
  DragIndicatorOutlined,
  EditOutlined,
} from "hobom-design-system/icons";
import { Hb, Sortable } from "@/shared/ui";
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
    <Hb.Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* 보드 헤더 */}
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        {isEditing ? (
          <Hb.TextField
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
          <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Hb.Text variant="body2" fontWeight={600}>
              {board.name}
            </Hb.Text>
            <Hb.Chip
              label={board.type}
              size="small"
              style={{
                height: 20,
                fontSize: 10,
                fontWeight: 700,
                backgroundColor: "var(--hb-color-border)",
                color: "var(--hb-color-text-secondary)",
              }}
            />
          </Hb.Box>
        )}
        <Hb.Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
          <Hb.Tooltip title="이름 수정">
            <Hb.Button.Icon
              size="small"
              onClick={() => setIsEditing(true)}
              sx={{ color: "text.disabled" }}
            >
              <EditOutlined sx={{ fontSize: 16 }} />
            </Hb.Button.Icon>
          </Hb.Tooltip>
          <Hb.Tooltip title="삭제">
            <Hb.Button.Icon
              size="small"
              onClick={onDelete}
              sx={{
                color: "text.disabled",
                "&:hover": { color: "error.main" },
              }}
            >
              <DeleteOutline sx={{ fontSize: 16 }} />
            </Hb.Button.Icon>
          </Hb.Tooltip>
        </Hb.Box>
      </Hb.Box>
      {/* 컬럼 목록 (드래그 정렬) */}
      <Hb.Text
        variant="caption"
        color="text.secondary"
        fontWeight={600}
        style={{
          marginBottom: 4,
          display: "block",
        }}
      >
        컬럼
      </Hb.Text>
      <Sortable.Root onDragEnd={handleColumnReorder}>
        <Sortable.List items={board.columns.map((c) => c.statusId)} strategy="vertical">
          <Hb.Stack spacing={0.5}>
            {board.columns.map((col) => {
              const config = getStatusConfig(col.statusId);

              return (
                <Sortable.Item key={col.statusId} id={col.statusId} useHandle>
                  <Hb.Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1.5,
                      bgcolor: "action.hover",
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
                    <Hb.Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: config.color,
                        flexShrink: 0,
                      }}
                    />
                    <Hb.Text
                      variant="body2"
                      style={{
                        flex: 1,
                        fontSize: 13,
                      }}
                    >
                      {col.name}
                    </Hb.Text>
                    <Hb.Text
                      variant="caption"
                      color="text.disabled"
                      style={{
                        fontSize: 11,
                      }}
                    >
                      {col.statusId}
                    </Hb.Text>
                    {col.wipLimit != null && (
                      <Hb.Chip
                        label={`WIP ${col.wipLimit}`}
                        size="small"
                        style={{
                          height: 18,
                          fontSize: 10,
                          fontWeight: 600,
                          backgroundColor: "var(--hb-color-border)",
                        }}
                      />
                    )}
                    <Hb.Button.Icon
                      size="small"
                      onClick={() => handleRemoveColumn(col.statusId)}
                      sx={{
                        p: 0.25,
                        color: "text.disabled",
                        "&:hover": { color: "error.main" },
                      }}
                    >
                      <CloseOutlined sx={{ fontSize: 14 }} />
                    </Hb.Button.Icon>
                  </Hb.Box>
                </Sortable.Item>
              );
            })}
          </Hb.Stack>
        </Sortable.List>
      </Sortable.Root>
      {/* 컬럼 추가 */}
      <Hb.Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
        <Hb.TextField
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
        <Hb.TextField
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
        <Hb.Button.Icon
          size="small"
          onClick={handleAddColumn}
          disabled={!newStatusId.trim() || !newStatusName.trim() || isDuplicate}
          sx={{ color: "primary.main", borderRadius: 1.5 }}
        >
          <AddOutlined sx={{ fontSize: 18 }} />
        </Hb.Button.Icon>
      </Hb.Box>
    </Hb.Box>
  );
};
