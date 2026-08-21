import * as stylex from "@stylexjs/stylex";
import { EmptyState, Hb } from "hobom-design-system";
import { CalendarTodayOutlined } from "hobom-design-system/icons";
import { useVolunteerBoard } from "../model/useVolunteerBoard";
import { useVolunteerSignup } from "../model/useVolunteerSignup";
import { VolunteerCalendar } from "./VolunteerCalendar";
import { VolunteerFeed } from "./VolunteerFeed";
import { styles } from "./VolunteerBoard.styles";

const TYPE_FILTERS = [
  { value: "ALL", label: "전체" },
  { value: "GENERAL", label: "일반" },
  { value: "OVERSEAS", label: "해외" },
] as const;

/** §05 봉사활동: a calendar (or list) of upcoming events with type / open-only
 *  filters and sign-up. */
export const VolunteerBoard = () => {
  const board = useVolunteerBoard();
  const controls = useVolunteerSignup();

  const dayLabel = board.selected.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const showDay = board.dayEvents.length > 0;
  const empty = (
    <EmptyState
      icon={
        <CalendarTodayOutlined style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />
      }
      message="예정된 봉사가 없어요."
    />
  );

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>함께할 봉사 일정</h1>
        <p {...stylex.props(styles.subtitle)}>한 번의 참여도 아이들에게는 큰 하루가 됩니다.</p>
      </header>

      <div {...stylex.props(styles.controls)}>
        <Hb.ToggleButtonGroup variant="segmented" aria-label="보기 방식">
          <Hb.ToggleButton
            variant="segmented"
            value="calendar"
            selected={board.view === "calendar"}
            onChange={() => board.setView("calendar")}
          >
            캘린더
          </Hb.ToggleButton>
          <Hb.ToggleButton
            variant="segmented"
            value="list"
            selected={board.view === "list"}
            onChange={() => board.setView("list")}
          >
            리스트
          </Hb.ToggleButton>
        </Hb.ToggleButtonGroup>

        <Hb.ToggleButtonGroup variant="segmented" aria-label="봉사 유형">
          {TYPE_FILTERS.map((filter) => (
            <Hb.ToggleButton
              key={filter.value}
              variant="segmented"
              value={filter.value}
              selected={board.typeFilter === filter.value}
              onChange={() => board.setTypeFilter(filter.value)}
            >
              {filter.label}
            </Hb.ToggleButton>
          ))}
        </Hb.ToggleButtonGroup>

        <Hb.ToggleButton
          value="open"
          selected={board.openOnly}
          onChange={() => board.setOpenOnly(!board.openOnly)}
        >
          모집 중만
        </Hb.ToggleButton>
      </div>

      {board.view === "calendar" ? (
        <div {...stylex.props(styles.board)}>
          <div {...stylex.props(styles.calendarCard)}>
            <VolunteerCalendar
              value={board.selected}
              onSelect={board.setSelected}
              eventDays={board.eventDays}
            />
          </div>

          <div {...stylex.props(styles.listCol)}>
            <h2 {...stylex.props(styles.dayTitle)}>
              <span {...stylex.props(styles.rule)} aria-hidden />
              {showDay ? dayLabel : "다가오는 봉사"}
            </h2>
            <div {...stylex.props(styles.scrollArea)}>
              {showDay && <VolunteerFeed events={board.dayEvents} controls={controls} />}
              {!showDay && board.upcoming.length > 0 && (
                <VolunteerFeed events={board.upcoming} controls={controls} />
              )}
              {!showDay && board.upcoming.length === 0 && empty}
            </div>
          </div>
        </div>
      ) : (
        <div {...stylex.props(styles.listView)}>
          {board.upcoming.length > 0 ? (
            <VolunteerFeed events={board.upcoming} controls={controls} />
          ) : (
            empty
          )}
        </div>
      )}
    </div>
  );
};
