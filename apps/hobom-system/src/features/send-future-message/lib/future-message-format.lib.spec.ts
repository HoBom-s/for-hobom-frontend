import { describe, it, expect } from "vitest";
import { formatDate, formatTime } from "./future-message-format.lib";

describe("formatDate", () => {
  it("유효한 ISO 문자열을 포맷하면 연도가 포함된다", () => {
    const result = formatDate("2026-03-08T12:00:00Z");

    expect(result).toContain("2026");
  });

  it("유효하지 않은 문자열은 원본을 그대로 반환한다", () => {
    const raw = "not-a-date";

    expect(formatDate(raw)).toBe(raw);
  });
});

describe("formatTime", () => {
  it("유효한 ISO 문자열을 포맷하면 콜론이 포함된다", () => {
    const result = formatTime("2026-03-08T14:30:00Z");

    expect(result).toContain(":");
  });

  it("유효하지 않은 문자열은 원본을 그대로 반환한다", () => {
    const raw = "not-a-date";

    expect(formatTime(raw)).toBe(raw);
  });
});
