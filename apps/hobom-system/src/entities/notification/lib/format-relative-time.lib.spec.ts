import { describe, expect, it } from "vitest";
import { formatRelativeTime } from "./format-relative-time.lib";

describe("formatRelativeTime", () => {
  const NOW = new Date("2026-02-27T14:00:00Z");

  it("1분 미만이면 '방금 전'을 반환한다", () => {
    expect(formatRelativeTime("2026-02-27T13:59:30Z", NOW)).toBe("방금 전");
  });

  it("N분 전을 반환한다", () => {
    expect(formatRelativeTime("2026-02-27T13:45:00Z", NOW)).toBe("15분 전");
  });

  it("59분이면 분 단위로 반환한다", () => {
    expect(formatRelativeTime("2026-02-27T13:01:00Z", NOW)).toBe("59분 전");
  });

  it("N시간 전을 반환한다", () => {
    expect(formatRelativeTime("2026-02-27T11:00:00Z", NOW)).toBe("3시간 전");
  });

  it("N일 전을 반환한다", () => {
    expect(formatRelativeTime("2026-02-25T14:00:00Z", NOW)).toBe("2일 전");
  });

  it("7일 이상이면 'M월 d일' 포맷을 반환한다", () => {
    expect(formatRelativeTime("2026-02-10T12:00:00Z", NOW)).toBe("2월 10일");
  });

  it("방금 전 경계값을 처리한다", () => {
    expect(formatRelativeTime("2026-02-27T14:00:00Z", NOW)).toBe("방금 전");
  });
});
