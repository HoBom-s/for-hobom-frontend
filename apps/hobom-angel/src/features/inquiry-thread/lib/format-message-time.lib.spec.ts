import { describe, expect, it } from "vitest";
import { formatMessageTime } from "./format-message-time.lib";

describe("formatMessageTime", () => {
  it("renders a Korean month/day and time", () => {
    const out = formatMessageTime("2026-08-21T06:24:00.000Z");

    // Locale output varies by runtime TZ, so assert on the stable pieces.
    expect(out).toMatch(/8월/);
    expect(out).toMatch(/\d/);
  });

  it("returns an empty string for a null timestamp", () => {
    expect(formatMessageTime(null)).toBe("");
  });
});
