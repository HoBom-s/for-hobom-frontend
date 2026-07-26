import { describe, expect, it } from "vitest";
import { operatingYears } from "./operating-years.lib";

const now = new Date("2026-07-15T00:00:00.000Z");

describe("operatingYears", () => {
  it("counts whole years since the start date", () => {
    expect(operatingYears("2015-03-01T00:00:00.000Z", now)).toBe(11);
  });

  it("does not count the current year before the anniversary", () => {
    expect(operatingYears("2015-12-31T00:00:00.000Z", now)).toBe(10);
  });

  it("returns null for a missing or invalid date", () => {
    expect(operatingYears(null, now)).toBeNull();
    expect(operatingYears("not-a-date", now)).toBeNull();
  });
});
