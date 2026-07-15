import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import { volunteerEventQueries } from "@/entities/volunteer-event";
import { eventDayKeys, eventsOnDay, firstEventDate } from "../lib/group-events-by-day.lib";

/** The §05 board state: upcoming events, the calendar's selected day, and the
 *  events on that day. Loading suspends to the route boundary. */
export const useVolunteerBoard = () => {
  const { data: events } = useSuspenseQuery(volunteerEventQueries.upcoming());
  const [selected, setSelected] = useState<Date>(() => firstEventDate(events) ?? new Date());

  return {
    eventDays: eventDayKeys(events),
    selected,
    setSelected,
    dayEvents: eventsOnDay(events, selected),
  };
};
