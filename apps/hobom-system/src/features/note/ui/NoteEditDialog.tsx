import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Chip,
  Button,
  Checkbox,
  InputBase,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  CheckBoxOutlined,
  NotesOutlined,
  PaletteOutlined,
  LabelOutlined,
  NotificationAddOutlined,
  PersonAddOutlined,
  AddOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import type { NoteItemType } from "@/entities/note";
import { useNoteEditForm } from "../model/useNoteEditForm";
import { useNoteMemberShare } from "../model/useNoteMemberShare";
import { ColorPickerPopover } from "./ColorPickerPopover";
import { LabelPickerPopover } from "./LabelPickerPopover";
import { ReminderPickerPopover } from "./ReminderPickerPopover";
import { MemberPickerPopover } from "./MemberPickerPopover";

interface NoteEditDialogProps {
  open: boolean;
  onClose: () => void;
  note?: NoteItemType | null;
}

export const NoteEditDialog = ({
  open,
  onClose,
  note,
}: NoteEditDialogProps) => {
  const noteArg = note ?? null;

  const {
    isEdit,
    form,
    setField,
    toggleType,
    addChecklistItem,
    updateChecklistItem,
    removeChecklistItem,
    toggleLabel,
    setReminder,
    clearReminder,
    availableLabels,
    selectedLabelIds,
    labelMap,
    colorAnchor,
    setColorAnchor,
    labelAnchor,
    setLabelAnchor,
    reminderAnchor,
    setReminderAnchor,
    handleSave,
    isPending,
  } = useNoteEditForm({ open, note: noteArg, onClose });

  const {
    isOwner,
    noteMembers,
    availableUsers,
    memberAnchor,
    setMemberAnchor,
    handleAddMember,
    handleRemoveMember,
  } = useNoteMemberShare({ open, note: noteArg });

  return (
    <Dialog
      open={open}
      onClose={handleSave}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { backgroundColor: form.color, borderRadius: 2 },
      }}
    >
      <DialogContent sx={{ pb: 1 }}>
        <TextField
          placeholder="제목"
          fullWidth
          variant="standard"
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          InputProps={{ disableUnderline: true, sx: { fontWeight: 600 } }}
          sx={{ mb: 1 }}
        />

        {form.type === "TEXT" && (
          <TextField
            placeholder="메모 작성..."
            fullWidth
            multiline
            minRows={3}
            variant="standard"
            value={form.content}
            onChange={(e) => setField("content", e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
        )}

        {form.type === "CHECKLIST" && (
          <Box>
            {form.checklistItems.map((item, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
              >
                <Checkbox
                  size="small"
                  checked={item.checked}
                  onChange={(e) =>
                    updateChecklistItem(idx, "checked", e.target.checked)
                  }
                  sx={{ p: 0.5 }}
                />
                <InputBase
                  value={item.text}
                  onChange={(e) =>
                    updateChecklistItem(idx, "text", e.target.value)
                  }
                  placeholder="항목 입력..."
                  sx={{ flex: 1, fontSize: 14 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addChecklistItem();
                    }
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => removeChecklistItem(idx)}
                >
                  <CloseOutlined sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            ))}
            <Button
              size="small"
              startIcon={<AddOutlined />}
              onClick={addChecklistItem}
              sx={{ ml: 1, textTransform: "none" }}
            >
              항목 추가
            </Button>
          </Box>
        )}

        {selectedLabelIds.size > 0 && (
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {form.labels.map((labelId) => (
              <Chip
                key={labelId}
                label={labelMap[labelId] ?? labelId}
                size="small"
                onDelete={() => toggleLabel(labelId)}
              />
            ))}
          </Box>
        )}

        {form.reminder && (
          <Chip
            icon={<NotificationAddOutlined sx={{ fontSize: 14 }} />}
            label={`${new Date(form.reminder.date).toLocaleDateString("ko-KR")} ${form.reminder.recurrence !== "NONE" ? `(${form.reminder.recurrence})` : ""}`}
            size="small"
            onDelete={clearReminder}
            sx={{ mt: 1 }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ px: 2, pb: 1.5, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {!isEdit && (
            <Tooltip
              title={
                form.type === "TEXT" ? "체크리스트로 전환" : "텍스트로 전환"
              }
            >
              <IconButton size="small" onClick={toggleType}>
                {form.type === "TEXT" ? (
                  <CheckBoxOutlined fontSize="small" />
                ) : (
                  <NotesOutlined fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="배경색">
            <IconButton
              size="small"
              onClick={(e) => setColorAnchor(e.currentTarget)}
            >
              <PaletteOutlined fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="라벨">
            <IconButton
              size="small"
              onClick={(e) => setLabelAnchor(e.currentTarget)}
            >
              <LabelOutlined fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="리마인더">
            <IconButton
              size="small"
              onClick={(e) => setReminderAnchor(e.currentTarget)}
            >
              <NotificationAddOutlined fontSize="small" />
            </IconButton>
          </Tooltip>

          {isEdit && (
            <Tooltip title="멤버 공유">
              <IconButton
                size="small"
                aria-label="멤버 공유"
                onClick={(e) => setMemberAnchor(e.currentTarget)}
              >
                <Badge
                  badgeContent={noteMembers.length || undefined}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: 10,
                      height: 16,
                      minWidth: 16,
                    },
                  }}
                >
                  <PersonAddOutlined fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Button
          onClick={handleSave}
          loading={isPending}
          sx={{ textTransform: "none" }}
        >
          닫기
        </Button>
      </DialogActions>

      <ColorPickerPopover
        anchorEl={colorAnchor}
        onClose={() => setColorAnchor(null)}
        value={form.color}
        onChange={(color) => setField("color", color)}
      />

      <LabelPickerPopover
        anchorEl={labelAnchor}
        onClose={() => setLabelAnchor(null)}
        labels={availableLabels}
        selectedIds={selectedLabelIds}
        onToggle={toggleLabel}
      />

      <ReminderPickerPopover
        anchorEl={reminderAnchor}
        onClose={() => setReminderAnchor(null)}
        onSet={setReminder}
      />

      <MemberPickerPopover
        anchorEl={memberAnchor}
        onClose={() => setMemberAnchor(null)}
        members={noteMembers}
        availableUsers={availableUsers}
        isOwner={isOwner}
        onAdd={handleAddMember}
        onRemove={handleRemoveMember}
      />
    </Dialog>
  );
};
