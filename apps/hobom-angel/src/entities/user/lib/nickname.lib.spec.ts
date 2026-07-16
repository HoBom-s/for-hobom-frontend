import { describe, expect, it } from "vitest";
import { validateNickname } from "./nickname.lib";

describe("validateNickname", () => {
  it("accepts a valid 한글/영문/숫자/_/- nickname", () => {
    expect(validateNickname("봄이네")).toBeNull();
    expect(validateNickname("hobom_2")).toBeNull();
    expect(validateNickname("a-b")).toBeNull();
  });

  it("rejects names that are too short or too long", () => {
    expect(validateNickname("가")).toBe("2자 이상 입력해 주세요.");
    expect(validateNickname("a".repeat(21))).toBe("20자 이하로 입력해 주세요.");
  });

  it("rejects disallowed characters", () => {
    expect(validateNickname("봄 이네")).toBe("한글, 영문, 숫자, _, - 만 쓸 수 있어요.");
    expect(validateNickname("hobom!")).toBe("한글, 영문, 숫자, _, - 만 쓸 수 있어요.");
  });
});
