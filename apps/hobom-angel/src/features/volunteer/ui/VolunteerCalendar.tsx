import { Calendar } from "hobom-design-system/date-pickers";
import { dateKey } from "../lib/group-events-by-day.lib";

interface VolunteerCalendarProps {
  value: Date;
  onSelect: (date: Date) => void;
  /** Local day keys that have events — rendered with a dot. */
  eventDays: Set<string>;
}

/** The month calendar with a dot on days that have volunteer events (§05). */
export const VolunteerCalendar = ({ value, onSelect, eventDays }: VolunteerCalendarProps) => (
  <Calendar
    value={value}
    onSelect={onSelect}
    labelFormat="yyyy년 M월"
    style={{ width: "100%" }}
    renderDay={(day) => <Calendar.DayButton {...day} dot={eventDays.has(dateKey(day.date))} />}
  />
);
