import { describe, expect, it } from "vitest";
import type { Report } from "@/entities/report";
import { maskReporter, reportHeadline } from "./report-format.lib";

const report = (over: Partial<Report> = {}): Report => ({
  id: "r1",
  reporterId: "651f2a9c0b1d2e3f4a5b6c7d",
  targetType: "ANIMAL",
  targetRef: "animal-1",
  reason: "ANIMAL_ABUSE",
  detail: "학대 정황",
  status: "PENDING",
  resolution: null,
  resolvedAt: null,
  ...over,
});

describe("maskReporter", () => {
  it("shows only the id tail", () => {
    expect(maskReporter("651f2a9c0b1d2e3f4a5b6c7d")).toBe("신고자 5b6c7d");
  });
});

describe("reportHeadline", () => {
  it("combines the target and reason labels", () => {
    expect(reportHeadline(report())).toBe("동물 신고 · 동물 학대");
    expect(reportHeadline(report({ targetType: "SHELTER", reason: "FAKE_SHELTER" }))).toBe(
      "보호소 신고 · 허위 보호소",
    );
  });
});
