import { describe, expect, it } from "vitest";
import { formatCertDate, formatDay, formatMinutes } from "./certificate-format.lib";

describe("formatMinutes", () => {
  it("formats hours and minutes, dropping a zero part", () => {
    expect(formatMinutes(150)).toBe("2시간 30분");
    expect(formatMinutes(45)).toBe("45분");
    expect(formatMinutes(180)).toBe("3시간");
    expect(formatMinutes(0)).toBe("0분");
  });
});

describe("formatCertDate", () => {
  it("renders a full Korean date", () => {
    expect(formatCertDate("2026-08-16T00:00:00Z")).toContain("2026년");
    expect(formatCertDate("2026-08-16T00:00:00Z")).toContain("8월");
  });
});

describe("formatDay", () => {
  it("renders month and day only", () => {
    const day = formatDay("2026-08-16T00:00:00Z");

    expect(day).toContain("8월");
    expect(day).not.toContain("2026");
  });
});
