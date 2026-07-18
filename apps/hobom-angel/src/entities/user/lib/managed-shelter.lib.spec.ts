import { describe, expect, it } from "vitest";
import { managedShelter } from "./managed-shelter.lib";
import type { CurrentUser } from "../api/user.type";

const user = (shelterRoles: CurrentUser["shelterRoles"]): CurrentUser => ({
  id: "user-1",
  nickname: "봄이네",
  email: "hobom@example.com",
  verifiedChannel: "EMAIL",
  roles: [],
  shelterRoles,
});

describe("managedShelter", () => {
  it("returns the first shelter membership", () => {
    expect(managedShelter(user([{ shelterId: "s1", role: "SHELTER_ADMIN" }]))).toEqual({
      shelterId: "s1",
      role: "SHELTER_ADMIN",
    });
  });

  it("returns null for a member with no shelter role", () => {
    expect(managedShelter(user([]))).toBeNull();
  });

  it("returns null when there is no signed-in user", () => {
    expect(managedShelter(undefined)).toBeNull();
  });
});
