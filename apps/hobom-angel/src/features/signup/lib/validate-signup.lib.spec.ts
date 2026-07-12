import { describe, expect, it } from "vitest";
import { isValidCode, isValidEmail, validateProfile } from "./validate-signup.lib";

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

describe("isValidCode", () => {
  it("accepts exactly six digits", () => {
    expect(isValidCode("417284")).toBe(true);
  });

  it("rejects anything that isn't six digits", () => {
    expect(isValidCode("4172")).toBe(false);
    expect(isValidCode("4172840")).toBe(false);
    expect(isValidCode("41728a")).toBe(false);
  });
});

describe("validateProfile", () => {
  it("passes for a nickname and an 8+ character password", () => {
    expect(validateProfile({ nickname: "봄이네", password: "hobom1234" })).toEqual({});
  });

  it("requires a nickname", () => {
    expect(validateProfile({ nickname: " ", password: "hobom1234" }).nickname).toBe(
      "닉네임을 입력해주세요.",
    );
  });

  it("requires an 8+ character password", () => {
    expect(validateProfile({ nickname: "봄이네", password: "short" }).password).toBe(
      "비밀번호는 8자 이상이어야 해요.",
    );
  });
});
