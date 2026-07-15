import type { VolunteerEvent } from "@/entities/volunteer-event";

const keyOf = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/** Local day key (YYYY-MM-DD) for an ISO datetime — groups events by start day. */
export const dayKey = (iso: string): string => keyOf(new Date(iso));

/** Local day key for a Date. */
export const dateKey = (date: Date): string => keyOf(date);

/** The distinct local days that have at least one event (for calendar dots). */
export const eventDayKeys = (events: VolunteerEvent[]): Set<string> =>
  new Set(events.map((event) => dayKey(event.startAt)));

/** Events whose start day matches the given date (local). */
export const eventsOnDay = (events: VolunteerEvent[], date: Date): VolunteerEvent[] => {
  const key = dateKey(date);

  return events.filter((event) => dayKey(event.startAt) === key);
};

/** Start Date of the earliest event, or null — opens the calendar on a day that
 *  actually has volunteering rather than an empty today. */
export const firstEventDate = (events: VolunteerEvent[]): Date | null => {
  if (events.length === 0) return null;

  const earliest = events.reduce((min, event) => (event.startAt < min.startAt ? event : min));

  return new Date(earliest.startAt);
};
