import { describe, expect, it } from "vitest";
import type { PendingApproval } from "@/entities/approval";
import {
  approvalContextLine,
  approvalHeadline,
  formatApprovalDate,
  maskRequester,
  subjectTag,
} from "./approval-format.lib";

const make = (over: Partial<PendingApproval>): PendingApproval => ({
  approvalId: "ap-1",
  type: "ADOPTION",
  subjectRef: "adoption-abc123",
  requesterId: "user-xyz789",
  context: null,
  createdAt: null,
  ...over,
});

describe("approvalHeadline", () => {
  it("labels each type with a 요청 suffix", () => {
    expect(approvalHeadline("SHELTER_VERIFICATION")).toBe("보호소 검증 요청");
    expect(approvalHeadline("STAFF_PROMOTION")).toBe("스태프 승격 요청");
    expect(approvalHeadline("ADOPTION")).toBe("입양 요청");
    expect(approvalHeadline("FOSTER")).toBe("임보 요청");
  });
});

describe("subjectTag", () => {
  it("names the subject per type and shortens the id", () => {
    expect(subjectTag(make({ type: "SHELTER_VERIFICATION", subjectRef: "shelter-9900aa" }))).toBe(
      "보호소 #9900aa",
    );
    expect(subjectTag(make({ type: "STAFF_PROMOTION", subjectRef: "user-4455bb" }))).toBe(
      "대상 회원 #4455bb",
    );
    expect(subjectTag(make({ type: "ADOPTION", subjectRef: "adoption-abc123" }))).toBe(
      "신청서 #abc123",
    );
  });
});

describe("maskRequester", () => {
  it("keeps only the id tail", () => {
    expect(maskRequester("user-xyz789")).toBe("요청자 xyz789");
  });
});

describe("approvalContextLine", () => {
  it("prefers the animal, then the shelter, else null", () => {
    expect(approvalContextLine(make({ context: { animalId: "animal-770077" } }))).toBe(
      "대상 동물 #770077",
    );
    expect(approvalContextLine(make({ context: { shelterId: "shelter-110022" } }))).toBe(
      "소속 보호소 #110022",
    );
    expect(approvalContextLine(make({ context: null }))).toBeNull();
    expect(approvalContextLine(make({ context: { note: "x" } }))).toBeNull();
  });
});

describe("formatApprovalDate", () => {
  it("formats an ISO date and passes null through", () => {
    expect(formatApprovalDate("2026-07-26T01:20:00Z")).toContain("7월");
    expect(formatApprovalDate(null)).toBeNull();
  });
});
