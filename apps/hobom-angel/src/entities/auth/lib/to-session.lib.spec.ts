import { describe, expect, it } from "vitest";
import { toSession } from "./to-session.lib";

describe("toSession", () => {
  it("keeps userId and nickname and drops the cookie-managed tokens", () => {
    const session = toSession({
      userId: "user-1",
      nickname: "봄이네",
      tokens: { accessToken: "access", refreshToken: "refresh" },
    });

    expect(session).toEqual({ userId: "user-1", nickname: "봄이네" });
  });
});
