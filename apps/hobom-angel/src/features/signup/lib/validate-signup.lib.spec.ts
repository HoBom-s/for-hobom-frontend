import { describe, expect, it } from "vitest";
import {
  isValidEmail,
  isValidNickname,
  isValidPassword,
  isValidPhone,
  isValidRealName,
} from "./validate-signup.lib";

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

describe("isValidPassword", () => {
  it("accepts 8–72 chars mixing letters and digits", () => {
    expect(isValidPassword("hobom123")).toBe(true);
    expect(isValidPassword("a1".repeat(36))).toBe(true); // 72 chars
  });

  it("rejects too short, too long, or missing a letter/digit", () => {
    expect(isValidPassword("hobom1")).toBe(false); // too short
    expect(isValidPassword("password")).toBe(false); // no digit
    expect(isValidPassword("12345678")).toBe(false); // no letter
    expect(isValidPassword("a1".repeat(37))).toBe(false); // 74 chars
  });
});

describe("isValidNickname", () => {
  it("accepts 2–20 chars of Korean/Latin letters, digits, _ or -", () => {
    expect(isValidNickname("봄이네")).toBe(true);
    expect(isValidNickname("hobom_2")).toBe(true);
  });

  it("rejects too short, too long, or illegal characters", () => {
    expect(isValidNickname("a")).toBe(false);
    expect(isValidNickname("a".repeat(21))).toBe(false);
    expect(isValidNickname("hobom!")).toBe(false);
    expect(isValidNickname("봄 이네")).toBe(false);
  });
});

describe("isValidRealName", () => {
  it("accepts a non-empty name up to 50 chars", () => {
    expect(isValidRealName("김민수")).toBe(true);
    expect(isValidRealName("  김민수  ")).toBe(true);
  });

  it("rejects empty or overly long names", () => {
    expect(isValidRealName("   ")).toBe(false);
    expect(isValidRealName("가".repeat(51))).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("accepts 010 followed by 8 digits", () => {
    expect(isValidPhone("01012345678")).toBe(true);
  });

  it("rejects other formats", () => {
    expect(isValidPhone("010-1234-5678")).toBe(false);
    expect(isValidPhone("0111234567")).toBe(false);
    expect(isValidPhone("0101234567")).toBe(false);
  });
});
