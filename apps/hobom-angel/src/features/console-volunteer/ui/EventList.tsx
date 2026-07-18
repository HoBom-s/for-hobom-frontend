import * as stylex from "@stylexjs/stylex";
import type { VolunteerEvent } from "@/entities/volunteer-event";
import { EventRow } from "./EventRow";
import { styles } from "./EventList.styles";

interface EventListProps {
  events: VolunteerEvent[];
  onCancel: (eventId: string) => void;
}

/** The shelter's volunteer schedule — each row shows recruitment and expands to
 *  its applicants. */
export const EventList = ({ events, onCancel }: EventListProps) => {
  if (events.length === 0) {
    return <p {...stylex.props(styles.empty)}>아직 등록한 봉사 일정이 없어요.</p>;
  }

  return (
    <div {...stylex.props(styles.list)}>
      {events.map((event) => (
        <EventRow key={event.id} event={event} onCancel={onCancel} />
      ))}
    </div>
  );
};
