import { describe, expect, it } from "vitest";
import { isValidEmail, isValidNickname } from "./validate-signup.lib";

describe("isValidEmail", () => {
  it("accepts a well-formed address and trims whitespace", () => {
    expect(isValidEmail("hobom@example.com")).toBe(true);
    expect(isValidEmail("  hobom@example.com  ")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(isValidEmail("hobom@")).toBe(false);
    expect(isValidEmail("hobom.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("isValidNickname", () => {
  it("accepts 2–20 chars of Korean/Latin letters, digits, _ or -", () => {
    expect(isValidNickname("봄이네")).toBe(true);
    expect(isValidNickname("hobom_2")).toBe(true);
    expect(isValidNickname("ab")).toBe(true);
    expect(isValidNickname("  봄이네  ")).toBe(true);
  });

  it("rejects too short, too long, or illegal characters", () => {
    expect(isValidNickname("a")).toBe(false);
    expect(isValidNickname("a".repeat(21))).toBe(false);
    expect(isValidNickname("hobom!")).toBe(false);
    expect(isValidNickname("봄 이네")).toBe(false);
    expect(isValidNickname("")).toBe(false);
  });
});
