import { describe, expect, it } from "vitest";
import type { VolunteerEvent } from "@/entities/volunteer-event";
import { dateKey, dayKey, eventDayKeys, eventsOnDay, firstEventDate } from "./group-events-by-day.lib";

// Build the ISO from local components so the round-trip through the local-day
// helpers is timezone-independent in tests.
const at = (year: number, month: number, day: number, hour = 12): string =>
  new Date(year, month - 1, day, hour).toISOString();

const event = (id: string, startAt: string): VolunteerEvent => ({
  id,
  shelterId: "shelter-1",
  title: "봉사",
  description: "",
  startAt,
  endAt: startAt,
  capacity: 10,
  signedUpCount: 0,
  status: "OPEN",
  type: "GENERAL",
  transport: null,
  mySignupId: null,
  mySignupStatus: null,
});

describe("group-events-by-day", () => {
  it("keys an ISO datetime by its local calendar day", () => {
    expect(dayKey(at(2026, 7, 4))).toBe("2026-07-04");
    expect(dateKey(new Date(2026, 6, 4))).toBe("2026-07-04");
  });

  it("collects the distinct days that have events", () => {
    const days = eventDayKeys([at(2026, 7, 4), at(2026, 7, 4, 15), at(2026, 7, 10)].map((iso, i) => event(String(i), iso)));

    expect(days).toEqual(new Set(["2026-07-04", "2026-07-10"]));
  });

  it("filters events to the selected day", () => {
    const events = [event("a", at(2026, 7, 4)), event("b", at(2026, 7, 10))];

    expect(eventsOnDay(events, new Date(2026, 6, 4)).map((e) => e.id)).toEqual(["a"]);
  });

  it("returns the earliest event's date, or null when empty", () => {
    const events = [event("late", at(2026, 7, 10)), event("early", at(2026, 7, 4))];

    expect(firstEventDate(events)?.getDate()).toBe(4);
    expect(firstEventDate([])).toBeNull();
  });
});
