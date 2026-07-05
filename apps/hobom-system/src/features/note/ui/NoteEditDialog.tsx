import {
  CheckBoxOutlined,
  NotesOutlined,
  PaletteOutlined,
  LabelOutlined,
  NotificationAddOutlined,
  PersonAddOutlined,
  AddOutlined,
  CloseOutlined,
} from "hobom-design-system/icons";
import { NOTE_COLORS, type NoteItemType } from "@/entities/note";
import { Hb } from "@/shared/ui";
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

export const NoteEditDialog = ({ open, onClose, note }: NoteEditDialogProps) => {
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
    <Hb.Dialog.Root
      open={open}
      onClose={handleSave}
      size="sm"
      PaperProps={{
        sx: {
          backgroundColor:
            form.color === NOTE_COLORS.DEFAULT ? "var(--hb-color-surface)" : form.color,
          borderRadius: 2,
        },
      }}
    >
      <Hb.Dialog.Content sx={{ pb: 1 }}>
        <Hb.TextField
          placeholder="제목"
          fullWidth
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          InputProps={{ disableUnderline: true, sx: { fontWeight: 600 } }}
          sx={{ mb: 1 }}
        />

        {form.type === "TEXT" && (
          <Hb.TextField
            placeholder="메모 작성..."
            fullWidth
            multiline
            minRows={3}
            value={form.content}
            onChange={(e) => setField("content", e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
        )}

        {form.type === "CHECKLIST" && (
          <Hb.Box>
            {form.checklistItems.map((item, idx) => (
              <Hb.Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <Hb.Checkbox
                  size="small"
                  checked={item.checked}
                  onChange={(e) => updateChecklistItem(idx, "checked", e.target.checked)}
                  sx={{ p: 0.5 }}
                />
                <Hb.InputBase
                  value={item.text}
                  onChange={(e) => updateChecklistItem(idx, "text", e.target.value)}
                  placeholder="항목 입력..."
                  sx={{ flex: 1, fontSize: 14 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addChecklistItem();
                    }
                  }}
                />
                <Hb.Button.Icon
                  size="small"
                  aria-label="항목 삭제"
                  onClick={() => removeChecklistItem(idx)}
                >
                  <CloseOutlined sx={{ fontSize: 16 }} />
                </Hb.Button.Icon>
              </Hb.Box>
            ))}
            <Hb.Button
              size="small"
              startIcon={<AddOutlined />}
              onClick={addChecklistItem}
              sx={{ ml: 1, textTransform: "none" }}
            >
              항목 추가
            </Hb.Button>
          </Hb.Box>
        )}

        {selectedLabelIds.size > 0 && (
          <Hb.Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {form.labels.map((labelId) => (
              <Hb.Chip
                key={labelId}
                label={labelMap[labelId] ?? labelId}
                size="small"
                onDelete={() => toggleLabel(labelId)}
              />
            ))}
          </Hb.Box>
        )}

        {form.reminder && (
          <Hb.Chip
            icon={<NotificationAddOutlined sx={{ fontSize: 14 }} />}
            label={`${new Date(form.reminder.date).toLocaleDateString("ko-KR")} ${form.reminder.recurrence !== "NONE" ? `(${form.reminder.recurrence})` : ""}`}
            size="small"
            onDelete={clearReminder}
            style={{
              marginTop: 8,
            }}
          />
        )}
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions sx={{ px: 2, pb: 1.5, justifyContent: "space-between" }}>
        <Hb.Box sx={{ display: "flex", gap: 0.5 }}>
          {!isEdit && (
            <Hb.Tooltip title={form.type === "TEXT" ? "체크리스트로 전환" : "텍스트로 전환"}>
              <Hb.Button.Icon
                size="small"
                aria-label={form.type === "TEXT" ? "체크리스트로 전환" : "텍스트로 전환"}
                onClick={toggleType}
              >
                {form.type === "TEXT" ? (
                  <CheckBoxOutlined fontSize="small" />
                ) : (
                  <NotesOutlined fontSize="small" />
                )}
              </Hb.Button.Icon>
            </Hb.Tooltip>
          )}

          <Hb.Tooltip title="배경색">
            <Hb.Button.Icon
              size="small"
              aria-label="배경색"
              onClick={(e) => setColorAnchor(e.currentTarget)}
            >
              <PaletteOutlined fontSize="small" />
            </Hb.Button.Icon>
          </Hb.Tooltip>

          <Hb.Tooltip title="라벨">
            <Hb.Button.Icon
              size="small"
              aria-label="라벨"
              onClick={(e) => setLabelAnchor(e.currentTarget)}
            >
              <LabelOutlined fontSize="small" />
            </Hb.Button.Icon>
          </Hb.Tooltip>

          <Hb.Tooltip title="리마인더">
            <Hb.Button.Icon
              size="small"
              aria-label="리마인더"
              onClick={(e) => setReminderAnchor(e.currentTarget)}
            >
              <NotificationAddOutlined fontSize="small" />
            </Hb.Button.Icon>
          </Hb.Tooltip>

          {isEdit && (
            <Hb.Tooltip title="멤버 공유">
              <Hb.Button.Icon
                size="small"
                aria-label="멤버 공유"
                onClick={(e) => setMemberAnchor(e.currentTarget)}
              >
                <Hb.Badge badgeContent={noteMembers.length || undefined} color="primary">
                  <PersonAddOutlined fontSize="small" />
                </Hb.Badge>
              </Hb.Button.Icon>
            </Hb.Tooltip>
          )}
        </Hb.Box>

        <Hb.Button onClick={handleSave} loading={isPending} sx={{ textTransform: "none" }}>
          닫기
        </Hb.Button>
      </Hb.Dialog.Actions>
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
    </Hb.Dialog.Root>
  );
};
