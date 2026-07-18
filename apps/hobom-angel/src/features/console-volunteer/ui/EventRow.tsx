import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { VOLUNTEER_STATUS_LABEL } from "@/entities/volunteer-event";
import type { VolunteerEvent, VolunteerEventStatus } from "@/entities/volunteer-event";
import { formatEventWhen, recruitLabel, recruitPercent } from "../lib/event-format.lib";
import { ApplicantList } from "./ApplicantList";
import { styles } from "./EventList.styles";

const STATUS_COLOR: Record<VolunteerEventStatus, "primary" | "default"> = {
  OPEN: "primary",
  CLOSED: "default",
  CANCELLED: "default",
};

interface EventRowProps {
  event: VolunteerEvent;
  onCancel: (eventId: string) => void;
}

/** One schedule row: recruitment gauge + status, a cancel action, and an
 *  expandable applicant list. */
export const EventRow = ({ event, onCancel }: EventRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <article {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.head)}>
        <h3 {...stylex.props(styles.title)}>{event.title}</h3>
        <Hb.Chip
          label={VOLUNTEER_STATUS_LABEL[event.status]}
          size="small"
          variant="soft"
          color={STATUS_COLOR[event.status]}
        />
      </div>

      <span {...stylex.props(styles.when)}>{formatEventWhen(event.startAt, event.endAt)}</span>

      <div {...stylex.props(styles.gauge)}>
        <div {...stylex.props(styles.gaugeFill)} style={{ width: `${recruitPercent(event)}%` }} />
      </div>
      <span {...stylex.props(styles.recruit)}>{recruitLabel(event)}</span>

      <div {...stylex.props(styles.actions)}>
        <Hb.Button variant="ghost" size="small" onClick={() => setOpen((value) => !value)}>
          지원자 {event.signedUpCount}명 {open ? "접기" : "보기"}
        </Hb.Button>
        <span {...stylex.props(styles.spacer)} />
        {event.status === "OPEN" && (
          <Hb.Button variant="ghost" size="small" onClick={() => onCancel(event.id)}>
            일정 취소
          </Hb.Button>
        )}
      </div>

      {open && (
        <div {...stylex.props(styles.applicants)}>
          <ApplicantList eventId={event.id} />
        </div>
      )}
    </article>
  );
};
