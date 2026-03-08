import { describe, it, expect } from "vitest";
import { getAvatarColor } from "./avatar-color.lib";

const AVATAR_COLORS = [
  "#4680ff",
  "#2ca87f",
  "#e58a00",
  "#7c3aed",
  "#0891b2",
  "#dc2626",
];

describe("getAvatarColor", () => {
  it("항상 사전 정의된 색상 중 하나를 반환한다", () => {
    const inputs = ["alice", "bob", "user-123", "xyz", ""];

    for (const input of inputs) {
      expect(AVATAR_COLORS).toContain(getAvatarColor(input));
    }
  });

  it("같은 입력에 대해 동일한 결과를 반환한다 (결정적)", () => {
    const input = "user-abc-123";

    expect(getAvatarColor(input)).toBe(getAvatarColor(input));
  });

  it("서로 다른 입력에 대해 다른 색상을 반환할 수 있다", () => {
    const colors = new Set(["a", "b", "c", "d", "e", "f"].map(getAvatarColor));

    expect(colors.size).toBeGreaterThan(1);
  });

  it("빈 문자열도 유효한 색상을 반환한다", () => {
    expect(AVATAR_COLORS).toContain(getAvatarColor(""));
  });

  it("긴 문자열도 정상적으로 처리한다", () => {
    const longStr = "a".repeat(1000);

    expect(AVATAR_COLORS).toContain(getAvatarColor(longStr));
  });
});
