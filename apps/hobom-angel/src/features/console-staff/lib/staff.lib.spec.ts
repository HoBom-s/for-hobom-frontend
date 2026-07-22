import { describe, expect, it } from "vitest";
import type { ShelterStaffMember } from "@/entities/shelter";
import { primaryRoleLabel, sortRoster } from "./staff.lib";

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
