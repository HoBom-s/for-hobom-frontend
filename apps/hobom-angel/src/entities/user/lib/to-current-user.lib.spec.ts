import { describe, expect, it } from "vitest";
import { toCurrentUser } from "./to-current-user.lib";

describe("toCurrentUser", () => {
  it("keeps id/nickname/email and drops roles, status, and the verified channel", () => {
    const user = toCurrentUser({
      id: "user-1",
      nickname: "봄이네",
      email: "hobom@example.com",
      verifiedChannel: "EMAIL",
      roles: ["MEMBER"],
      shelterRoles: [{ shelterId: "s1", role: "STAFF" }],
      status: "ACTIVE",
    });

    expect(user).toEqual({ id: "user-1", nickname: "봄이네", email: "hobom@example.com" });
  });
});
