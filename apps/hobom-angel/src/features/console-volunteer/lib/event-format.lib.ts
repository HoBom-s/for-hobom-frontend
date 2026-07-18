import { spotsLeft } from "@/entities/volunteer-event";
import type { VolunteerEvent } from "@/entities/volunteer-event";

/** Build the ISO start/end range for a create request from a date + times.
 *  The wall-clock values are kept as-is (no timezone shift). */
export const toEventRange = (date: string, startTime: string, endTime: string) => ({
  startAt: `${date}T${startTime}:00`,
  endAt: `${date}T${endTime}:00`,
});

/** "2026.07.04 · 10:00–13:00" from an event's ISO start/end (wall-clock). */
export const formatEventWhen = (startAt: string, endAt: string): string => {
  const date = startAt.slice(0, 10).replaceAll("-", ".");

  return `${date} · ${startAt.slice(11, 16)}–${endAt.slice(11, 16)}`;
};

/** Recruitment progress as a 0–100 percentage of capacity (capped). */
export const recruitPercent = (event: VolunteerEvent): number => {
  if (event.capacity <= 0) return 0;

  return Math.min(100, Math.round((event.signedUpCount / event.capacity) * 100));
};

/** "모집 8 / 12명" summary. */
export const recruitLabel = (event: VolunteerEvent): string =>
  `모집 ${event.signedUpCount} / ${event.capacity}명 · ${spotsLeft(event)}자리 남음`;
