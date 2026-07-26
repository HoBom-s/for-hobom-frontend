import { describe, expect, it } from "vitest";
import type { VolunteerEvent } from "@/entities/volunteer-event";
import { formatEventWhen, recruitLabel, recruitPercent, toEventRange } from "./event-format.lib";

const event = (capacity: number, signedUpCount: number): VolunteerEvent => ({
  id: "e1",
  shelterId: "s1",
  title: "산책 봉사",
  description: "",
  startAt: "2026-07-04T10:00:00",
  endAt: "2026-07-04T13:00:00",
  capacity,
  signedUpCount,
  status: "OPEN",
  type: "GENERAL",
  transport: null,
  mySignupId: null,
  mySignupStatus: null,
});

describe("toEventRange", () => {
  it("stitches a date and start/end times into ISO wall-clock", () => {
    expect(toEventRange("2026-07-04", "10:00", "13:00")).toEqual({
      startAt: "2026-07-04T10:00:00",
      endAt: "2026-07-04T13:00:00",
    });
  });
});

describe("formatEventWhen", () => {
  it("formats a dotted date with the time range", () => {
    expect(formatEventWhen("2026-07-04T10:00:00", "2026-07-04T13:00:00")).toBe(
      "2026.07.04 · 10:00–13:00",
    );
  });
});

describe("recruitPercent", () => {
  it("is the filled percentage of capacity, capped at 100", () => {
    expect(recruitPercent(event(12, 8))).toBe(67);
    expect(recruitPercent(event(12, 20))).toBe(100);
    expect(recruitPercent(event(0, 0))).toBe(0);
  });
});

describe("recruitLabel", () => {
  it("summarizes filled / capacity with remaining spots", () => {
    expect(recruitLabel(event(12, 8))).toBe("모집 8 / 12명 · 4자리 남음");
  });
});
