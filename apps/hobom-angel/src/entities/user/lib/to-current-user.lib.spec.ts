import { describe, expect, it } from "vitest";
import { toCurrentUser } from "./to-current-user.lib";

describe("toCurrentUser", () => {
  it("keeps id/nickname/email/verifiedChannel and the console roles, dropping status", () => {
    const user = toCurrentUser({
      id: "user-1",
      nickname: "봄이네",
      email: "hobom@example.com",
      verifiedChannel: "EMAIL",
      roles: ["SHELTER_ADMIN"],
      shelterRoles: [{ shelterId: "s1", role: "SHELTER_ADMIN" }],
      status: "ACTIVE",
    });

    expect(user).toEqual({
      id: "user-1",
      nickname: "봄이네",
      email: "hobom@example.com",
      verifiedChannel: "EMAIL",
      roles: ["SHELTER_ADMIN"],
      shelterRoles: [{ shelterId: "s1", role: "SHELTER_ADMIN" }],
    });
  });
});
