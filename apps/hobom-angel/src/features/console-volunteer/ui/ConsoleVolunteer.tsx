import * as stylex from "@stylexjs/stylex";
import { useConsoleVolunteer } from "../model/useConsoleVolunteer";
import { EventForm } from "./EventForm";
import { EventList } from "./EventList";
import { styles } from "./ConsoleVolunteer.styles";

/** §07 봉사 일정 관리: create events on the left, manage the schedule and its
 *  applicants (approve / reject) on the right. Each column scrolls on its own. */
export const ConsoleVolunteer = ({ shelterId }: { shelterId: string }) => {
  const { events, createEvent, creating, cancelEvent } = useConsoleVolunteer(shelterId);

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>봉사 콘솔</span>
        <h1 {...stylex.props(styles.title)}>봉사 일정 관리</h1>
        <p {...stylex.props(styles.subtitle)}>일정 생성 · 정원/모집 · 지원자 승인</p>
      </header>

      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.col)}>
          <EventForm onCreate={createEvent} submitting={creating} />
        </div>
        <div {...stylex.props(styles.col)}>
          <EventList events={events} onCancel={cancelEvent} />
        </div>
      </div>
    </div>
  );
};
