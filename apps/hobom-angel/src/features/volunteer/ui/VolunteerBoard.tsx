import * as stylex from "@stylexjs/stylex";
import { EmptyState, Hb } from "hobom-design-system";
import { CalendarTodayOutlined } from "hobom-design-system/icons";
import { useVolunteerBoard } from "../model/useVolunteerBoard";
import { useVolunteerSignup } from "../model/useVolunteerSignup";
import { VolunteerCalendar } from "./VolunteerCalendar";
import { VolunteerEventCard } from "./VolunteerEventCard";
import { styles } from "./VolunteerBoard.styles";

/** §05 봉사활동: a month calendar of upcoming events and the selected day's
 *  events with sign-up. */
export const VolunteerBoard = () => {
  const { eventDays, selected, setSelected, dayEvents } = useVolunteerBoard();
  const { signUp, pendingEventId } = useVolunteerSignup();

  const dayLabel = selected.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>봉사활동</h1>
        <p {...stylex.props(styles.subtitle)}>캘린더에서 봉사 일정을 확인하고 신청하세요.</p>
      </header>

      <div {...stylex.props(styles.board)}>
        <Hb.Card.Root
          variant="outlined"
          style={{ padding: 20, borderRadius: "var(--hb-angel-radius-card)" }}
        >
          <VolunteerCalendar value={selected} onSelect={setSelected} eventDays={eventDays} />
        </Hb.Card.Root>

        <div {...stylex.props(styles.listCol)}>
          <h2 {...stylex.props(styles.dayTitle)}>{dayLabel}</h2>
          {dayEvents.length === 0 ? (
            <EmptyState
              icon={
                <CalendarTodayOutlined
                  style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }}
                />
              }
              message="이 날 예정된 봉사가 없어요."
            />
          ) : (
            <Hb.Stack spacing={2}>
              {dayEvents.map((event) => (
                <VolunteerEventCard
                  key={event.id}
                  event={event}
                  onSignUp={signUp}
                  pending={pendingEventId === event.id}
                />
              ))}
            </Hb.Stack>
          )}
        </div>
      </div>
    </div>
  );
};
