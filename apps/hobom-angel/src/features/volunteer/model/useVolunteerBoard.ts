import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import { shelterQueries } from "@/entities/shelter";
import { isSignUpOpen, volunteerEventQueries } from "@/entities/volunteer-event";
import type { VolunteerType } from "@/entities/volunteer-event";
import { enrichEvents } from "../lib/enrich-events.lib";
import { eventDayKeys, eventsOnDay, firstEventDate } from "../lib/group-events-by-day.lib";

export type VolunteerView = "calendar" | "list";
export type VolunteerTypeFilter = "ALL" | VolunteerType;

/** §05 board state: upcoming events joined with shelter names, the view mode,
 *  type / open-only filters, and the calendar's selected day. */
export const useVolunteerBoard = () => {
  const { data: events } = useSuspenseQuery(volunteerEventQueries.upcoming());
  const { data: markers } = useSuspenseQuery(shelterQueries.markers());

  const [view, setView] = useState<VolunteerView>("calendar");
  const [typeFilter, setTypeFilter] = useState<VolunteerTypeFilter>("ALL");
  const [openOnly, setOpenOnly] = useState(false);
  const [selected, setSelected] = useState<Date>(() => firstEventDate(events) ?? new Date());

  const filtered = enrichEvents(events, markers).filter(
    (event) =>
      (typeFilter === "ALL" || event.type === typeFilter) && (!openOnly || isSignUpOpen(event)),
  );

  return {
    view,
    setView,
    typeFilter,
    setTypeFilter,
    openOnly,
    setOpenOnly,
    selected,
    setSelected,
    eventDays: eventDayKeys(filtered),
    dayEvents: eventsOnDay(filtered, selected),
    upcoming: [...filtered].sort((a, b) => a.startAt.localeCompare(b.startAt)),
  };
};
