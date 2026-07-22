import { describe, expect, it } from "vitest";
import type { ShelterStaffMember, StaffPromotionRequest } from "@/entities/shelter";
import { candidateMeta, membershipLabel, primaryRoleLabel, sortRoster } from "./staff.lib";

const member = (
  nickname: string,
  roles: ShelterStaffMember["roles"],
): ShelterStaffMember => ({ id: nickname, nickname, roles, status: "ACTIVE" });

describe("sortRoster", () => {
  it("puts the representative first, then staff alphabetically", () => {
    const sorted = sortRoster([
      member("바다", ["SHELTER_STAFF"]),
      member("대표님", ["SHELTER_ADMIN"]),
      member("가을", ["SHELTER_STAFF"]),
    ]);

    expect(sorted.map((m) => m.nickname)).toEqual(["대표님", "가을", "바다"]);
  });

  it("does not mutate the input", () => {
    const input = [member("나", ["SHELTER_STAFF"]), member("가", ["SHELTER_ADMIN"])];

    sortRoster(input);

    expect(input.map((m) => m.nickname)).toEqual(["나", "가"]);
  });
});

describe("primaryRoleLabel", () => {
  it("labels an admin as 대표 and others as 스태프", () => {
    expect(primaryRoleLabel(member("a", ["SHELTER_ADMIN"]))).toBe("대표");
    expect(primaryRoleLabel(member("b", ["SHELTER_STAFF"]))).toBe("스태프");
  });
});

describe("membershipLabel", () => {
  const now = new Date("2026-07-23T00:00:00.000Z");

  it("renders months, then years", () => {
    expect(membershipLabel("2025-11-23T00:00:00.000Z", now)).toBe("가입 8개월");
    expect(membershipLabel("2024-01-01T00:00:00.000Z", now)).toBe("가입 2년");
  });

  it("floors sub-month tenure and handles missing dates", () => {
    expect(membershipLabel("2026-07-10T00:00:00.000Z", now)).toBe("가입 1개월 미만");
    expect(membershipLabel(null, now)).toBe("가입 정보 없음");
  });
});

describe("candidateMeta", () => {
  it("combines volunteer count and tenure", () => {
    const request: StaffPromotionRequest = {
      approvalId: "a1",
      candidateUserId: "u1",
      candidateNickname: "박자원",
      candidateJoinedAt: "2025-11-23T00:00:00.000Z",
      volunteerCount: 20,
    };

    expect(candidateMeta(request, new Date("2026-07-23T00:00:00.000Z"))).toBe("봉사 20회 · 가입 8개월");
  });
});
