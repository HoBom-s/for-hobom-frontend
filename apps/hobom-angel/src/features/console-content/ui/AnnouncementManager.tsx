import * as stylex from "@stylexjs/stylex";
import { useConsoleAnnouncements } from "../model/useConsoleAnnouncements";
import { AnnouncementForm } from "./AnnouncementForm";
import { AnnouncementList } from "./AnnouncementList";
import { styles } from "./ConsoleContent.styles";

/** 공지사항 management — the form on the left, the list on the right (1:1). */
export const AnnouncementManager = ({ shelterId }: { shelterId: string }) => {
  const {
    announcements,
    editing,
    edit,
    clearEdit,
    createAnnouncement,
    updateAnnouncement,
    removeAnnouncement,
    saving,
  } = useConsoleAnnouncements(shelterId);

  return (
    <div {...stylex.props(styles.layout)}>
      <AnnouncementForm
        key={editing?.id ?? "new"}
        editing={editing}
        onCreate={createAnnouncement}
        onUpdate={updateAnnouncement}
        onCancel={clearEdit}
        saving={saving}
      />
      <AnnouncementList
        announcements={announcements}
        editingId={editing?.id ?? null}
        onEdit={edit}
        onDelete={removeAnnouncement}
      />
    </div>
  );
};
