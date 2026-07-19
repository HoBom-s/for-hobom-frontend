import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { ShelterAnnouncement } from "@/entities/shelter";
import { styles } from "./ConsoleContent.styles";

interface AnnouncementListProps {
  announcements: ShelterAnnouncement[];
  editingId: string | null;
  onEdit: (announcement: ShelterAnnouncement) => void;
  onDelete: (id: string) => void;
}

/** The shelter's announcements — pinned first, each with edit / delete. */
export const AnnouncementList = ({
  announcements,
  editingId,
  onEdit,
  onDelete,
}: AnnouncementListProps) => {
  if (announcements.length === 0) {
    return <p {...stylex.props(styles.empty)}>아직 등록한 공지가 없어요.</p>;
  }

  return (
    <div {...stylex.props(styles.list)}>
      {announcements.map((announcement) => (
        <article
          key={announcement.id}
          {...stylex.props(styles.row, announcement.id === editingId && styles.rowActive)}
        >
          <div {...stylex.props(styles.rowHead)}>
            <span {...stylex.props(styles.rowTitle)}>{announcement.title}</span>
            {announcement.pinned && (
              <Hb.Chip label="고정" size="small" variant="soft" color="primary" />
            )}
            <span {...stylex.props(styles.spacer)} />
            <div {...stylex.props(styles.rowActions)}>
              <Hb.Button variant="ghost" size="small" onClick={() => onEdit(announcement)}>
                수정
              </Hb.Button>
              <Hb.Button variant="ghost" size="small" onClick={() => onDelete(announcement.id)}>
                삭제
              </Hb.Button>
            </div>
          </div>
          <p {...stylex.props(styles.preview)}>{announcement.body}</p>
        </article>
      ))}
    </div>
  );
};
