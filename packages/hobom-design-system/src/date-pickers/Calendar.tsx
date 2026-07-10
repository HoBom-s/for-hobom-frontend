import { type CSSProperties, type ReactNode, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  type Locale,
} from "date-fns";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "../icons";
import { Button } from "../components/Button/Button";

/** Info passed to each rendered day cell. */
export interface CalendarDayProps {
  date: Date;
  selected: boolean;
  today: boolean;
  outsideMonth: boolean;
  onSelect: (date: Date) => void;
}

type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface CalendarProps {
  /** The currently selected date, if any. */
  value?: Date | null;
  /** Controlled visible month (any date within it). */
  month?: Date;
  /** Initial visible month when uncontrolled. */
  defaultMonth?: Date;
  onSelect?: (date: Date) => void;
  onMonthChange?: (month: Date) => void;
  /** Custom day cell renderer; defaults to {@link Calendar.DayButton}. */
  renderDay?: (props: CalendarDayProps) => ReactNode;
  locale?: Locale;
  weekStartsOn?: WeekStart;
  /** date-fns format for the month header label. */
  labelFormat?: string;
  style?: CSSProperties;
}

const styles = stylex.create({
  root: {
    width: 288,
    userSelect: "none",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 2,
    marginBottom: 10,
  },
  label: {
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: 6,
  },
  weekLabel: {
    textAlign: "center",
    fontSize: "0.6875rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: "var(--hb-color-text-secondary)",
    paddingBlock: 4,
  },
  weekLabelWeekend: {
    color: "var(--hb-color-text-disabled)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    rowGap: 4,
    justifyItems: "center",
  },
  prevIcon: {
    transform: "rotate(180deg)",
  },
});

/** An inline month grid. Round-trips the visible month through `onMonthChange`. */
const CalendarBase = ({
  value,
  month,
  defaultMonth,
  onSelect,
  onMonthChange,
  renderDay,
  locale,
  weekStartsOn = 0,
  labelFormat = "yyyy.MM",
  style,
}: CalendarProps) => {
  const [internalMonth, setInternalMonth] = useState(() =>
    startOfMonth(month ?? value ?? defaultMonth ?? new Date()),
  );
  const viewMonth = month ? startOfMonth(month) : internalMonth;

  const goToMonth = (next: Date) => {
    const normalized = startOfMonth(next);

    if (!month) setInternalMonth(normalized);

    onMonthChange?.(normalized);
  };

  const gridStart = startOfWeek(startOfMonth(viewMonth), { weekStartsOn, locale });
  const gridEnd = endOfWeek(endOfMonth(viewMonth), { weekStartsOn, locale });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <div {...stylex.props(styles.root)} style={style}>
      <div {...stylex.props(styles.header)}>
        <Button.Icon
          size="small"
          aria-label="Previous month"
          onClick={() => goToMonth(addMonths(viewMonth, -1))}
        >
          <ChevronRight {...stylex.props(styles.prevIcon)} />
        </Button.Icon>
        <span {...stylex.props(styles.label)}>{format(viewMonth, labelFormat, { locale })}</span>
        <Button.Icon
          size="small"
          aria-label="Next month"
          onClick={() => goToMonth(addMonths(viewMonth, 1))}
        >
          <ChevronRight />
        </Button.Icon>
      </div>

      <div {...stylex.props(styles.weekRow)}>
        {days.slice(0, 7).map((day) => {
          const weekend = day.getDay() === 0 || day.getDay() === 6;

          return (
            <span
              key={day.getTime()}
              {...stylex.props(styles.weekLabel, weekend && styles.weekLabelWeekend)}
            >
              {format(day, "eee", { locale })}
            </span>
          );
        })}
      </div>

      <div {...stylex.props(styles.grid)}>
        {days.map((day) => {
          const dayProps: CalendarDayProps = {
            date: day,
            selected: value ? isSameDay(day, value) : false,
            today: isToday(day),
            outsideMonth: !isSameMonth(day, viewMonth),
            onSelect: (d) => onSelect?.(d),
          };

          return renderDay ? (
            <div key={day.getTime()}>{renderDay(dayProps)}</div>
          ) : (
            <DayButton key={day.getTime()} {...dayProps} />
          );
        })}
      </div>
    </div>
  );
};

const dayStyles = stylex.create({
  base: {
    position: "relative",
    width: 36,
    height: 36,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "none",
    borderRadius: "50%",
    backgroundColor: { default: "transparent", ":hover": "var(--hb-color-neutral)" },
    color: "var(--hb-color-text-primary)",
    fontSize: "0.8125rem",
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease, transform 0.1s ease",
    transform: { default: "scale(1)", ":active": "scale(0.9)" },
  },
  weekend: {
    color: "var(--hb-color-text-secondary)",
  },
  today: {
    fontWeight: 700,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "var(--hb-color-accent)",
    color: "var(--hb-color-accent)",
  },
  outsideMonth: {
    color: "var(--hb-color-text-disabled)",
  },
  selected: {
    fontWeight: 700,
    backgroundColor: { default: "var(--hb-color-accent)", ":hover": "var(--hb-color-accent-dark)" },
    color: "var(--hb-color-accent-contrast)",
    borderStyle: "none",
  },
  dot: {
    "::after": {
      content: "''",
      position: "absolute",
      bottom: 2,
      left: "50%",
      transform: "translateX(-50%)",
      width: 5,
      height: 5,
      borderRadius: "50%",
      backgroundColor: "var(--hb-color-success)",
    },
  },
  dotSelected: {
    "::after": {
      backgroundColor: "var(--hb-color-accent-contrast)",
    },
  },
});

interface DayButtonProps extends CalendarDayProps {
  /** Renders a small indicator dot under the day number. */
  dot?: boolean;
}

/** The default circular day cell — usable as a base for custom day slots. */
const DayButton = ({ date, selected, today, outsideMonth, onSelect, dot }: DayButtonProps) => {
  const weekend = date.getDay() === 0 || date.getDay() === 6;

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      {...stylex.props(
        dayStyles.base,
        weekend && dayStyles.weekend,
        outsideMonth && dayStyles.outsideMonth,
        today && !selected && dayStyles.today,
        selected && dayStyles.selected,
        dot && dayStyles.dot,
        dot && selected && dayStyles.dotSelected,
      )}
    >
      {date.getDate()}
    </button>
  );
};

export const Calendar = Object.assign(CalendarBase, { DayButton });
